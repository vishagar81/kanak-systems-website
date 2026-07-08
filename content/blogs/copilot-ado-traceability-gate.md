# Turning GitHub Copilot Into an Acceptance-Criteria Auditor: Engineering a Fail-Closed ADO ⇄ GitHub Traceability Gate

*A deep technical walkthrough of a two-gate GitHub Actions pipeline that injects live Azure DevOps Acceptance Criteria into every pull request, forces GitHub Copilot code review to audit against it, and mechanically enforces the verdict before merge.*

---

Every engineering organisation running Azure DevOps for planning and GitHub for source control eventually hits the same wall: the two systems agree on almost nothing. A pull request says "Fixes AB#4821." A human has to trust that sentence. Nothing re-reads the Acceptance Criteria on work item 4821, nothing checks whether the diff actually satisfies them, and nothing stops the PR from merging if it doesn't. Add an AI reviewer like GitHub Copilot code review into that picture and you get a second, more subtle problem: Copilot is very good at reviewing *code*, and has no idea whatsoever what the *business* asked for.

The pipeline dissected in this post — two GitHub Actions workflows (`gate1-ado-sync.yml` and `gate2-enforcement.yml`), a repository-wide `copilot-instructions.md`, and a companion `requirements-reviewer.agent.md` persona — closes that gap. It turns a plain-text ticket reference into machine-verified, merge-blocking proof that the acceptance criteria were actually implemented, using Copilot as the evaluator and GitHub Actions as the judge. This article covers what problem it solves, exactly how the two gates work internally, how to wire it up (ADO_PAT, ADO_ORG, ADO_PROJECT and all), and — because no design is perfect — where it is genuinely strong and where it has real, evidenced limitations.

## The problem: "approved" and "compliant" are not the same word

### Problem 1 — AI code review is context-blind by default

Ask Copilot code review to look at a diff and it will find null-reference risks, missing error handling, and inconsistent naming — because that's what it can *see*. It cannot see that Acceptance Criteria 3 on work item 4821 requires a specific retry policy, because that criterion lives in Azure DevOps, in a different product, behind a different authentication boundary, in an HTML-formatted rich-text field Copilot was never shown. A review that never saw the requirement cannot meaningfully judge whether the requirement was met. This is not a shortcoming of Copilot's model quality; it is a context-window problem, and context-window problems are solved by feeding the model the right information, not by hoping it infers it.

### Problem 2 — traceability by convention is traceability by trust

"Fixes AB#4821" in a PR description is prose. Nothing parses it, nothing validates that work item 4821 exists, nothing checks it hasn't been closed, reassigned, or rewritten since the branch was cut. In a regulated environment — the repository this pipeline was built for is a UK public-sector transport system on legacy ASP.NET MVC — auditors expect a *system of record*, not a convention that developers are trusted to follow correctly every time.

### Problem 3 — prose reviews cannot gate a merge

A human (or AI) reviewer writing "looks fine, ship it" is not something a machine can act on. For a review to gate a branch protection rule, its outcome must reduce to a small, closed set of values that a script can parse without ambiguity. Most Copilot reviews, by design, are conversational Markdown — exactly the opposite of that.

### Problem 4 — trust boundaries are spoofable if you're not careful

Once you decide "we'll block merges based on what Copilot says," you've created an authority. Anything that can be mistaken for that authority becomes a target. A bot account with "copilot" somewhere in its login, a stray comment worded to look like a verdict, a review left in a non-decisive state — all of these need to be explicitly *not* trusted, or the gate becomes trivially bypassable.

The rest of this article is about how the two-gate design answers all four problems at once.

## The macro architecture

At the highest level, the pipeline is a relay race with two runners — **Gate 1** injects context and requests the review; **Gate 2** reads the verdict and enforces it. Azure DevOps is both the source of truth for requirements and the destination for the audit trail; GitHub Copilot sits in the middle as the evaluator.

The diagram below is not a schematic drawn from imagination — it's assembled from an actual run against `AB#4821`, the Azure DevOps User Story for this very capability ("Create a code review agent to use the instructions file and ADO acceptance criteria"). A PR is opened referencing it **(1)**; Gate 1 reads the work item, converts its Acceptance Criteria into the numbered Given/When/Then scenarios shown in the injected ADO Requirements Snapshot **(2)**; Copilot performs the review **(3)**; and Gate 2 writes the verdict back as a PR comment **(4)** — captured here across two real runs, one `NEEDS-WORK` and one `PASS`, which the walkthrough later in this article unpacks in detail.


![The compliance pipeline end to end, captured from an actual run against AB#4821 — PR open, ADO snapshot injection, Copilot review, and the Gate 2 verdict comment, through to merge and deploy](/ado-compliance/ado-compliance-flow.svg)


<img src="/public/ado-compliance/ado-compliance-flow.svg" alt="The compliance pipeline end to end, captured from an actual run against AB#4821 — PR open, ADO snapshot injection, Copilot review, and the Gate 2 verdict comment, through to merge and deploy">

Two design decisions are worth calling out before going step-by-step. First, Gate 1 and Gate 2 are triggered by entirely different GitHub event types (`pull_request` vs. `pull_request_review` / `issue_comment`), so they cannot race each other or run out of order — Gate 2 structurally cannot fire until a review exists to react to. Second, every side-effect that isn't the actual pass/fail decision (the PR comment, the ADO write-back) is wrapped in `if: always()`, while the branch-protection-relevant Check Run and the `exit 1` are the only steps that actually gate anything. That separation of **observability** from **enforcement** is a pattern worth stealing even outside this specific use case.

## Gate 1 — Requirement Injection: turning an ADO ticket into executable context

Gate 1 (`gate1-ado-sync.yml`) runs on `pull_request: [opened, edited, synchronize, reopened]` — i.e., on every meaningful change to the PR, not just its creation, so the injected context never goes stale relative to the current diff.

### Step 1 — exactly one work item, no more, no less

```bash
MATCHES=$(printf '%s' "$PR_BODY" | grep -ioE 'ab#[0-9]+' | tr '[:lower:]' '[:upper:]' | sort -u || true)
COUNT=$(printf '%s\n' "$MATCHES" | sed '/^$/d' | wc -l | tr -d ' ')
```

Pseudocode for the intent, stripped of shell noise:

```
extract all substrings matching AB#<digits> from the PR body, case-insensitively
uppercase and de-duplicate them
if the resulting set has zero members  -> fail the job: "no traceability reference"
if the resulting set has more than one -> fail the job: "ambiguous — exactly one linked item required"
otherwise -> story_id = the single matched id
```

The security detail worth flagging: `PR_BODY` is passed in as an **environment variable**, not interpolated directly into the shell command string. A PR description is attacker-controlled input — any external contributor can write one — so interpolating it directly into a `run:` block would be a textbook GitHub Actions script-injection vector (a body containing ``$(curl ...)`` or backticks executed at shell-parse time). Reading it via `env:` and referencing it as `"$PR_BODY"` inside quotes avoids that entirely. This single-line difference is the kind of thing that separates a workflow that's safe for public/external PRs from one that isn't.

### Step 2 — fetch the requirement, classify its scope

```
GET https://dev.azure.com/{ADO_ORG}/{ADO_PROJECT}/_apis/wit/workitems/{story_id}?api-version=7.1
Authorization: Basic base64(":" + ADO_PAT)
```

The work item's `System.WorkItemType` decides everything downstream:

```
if type in {"User Story", "Product Backlog Item"}:
    scope = IN-SCOPE        # must have Acceptance Criteria evaluated
else:
    scope = EXEMPT           # e.g. Task, Bug, Feature — job still succeeds
```

This is a deliberate, pragmatic trade-off: not every work-item type in Azure Boards carries a meaningful Acceptance Criteria field, and forcing a Task or a Bug through the same AC-evidence bar as a User Story would either produce false failures or train the team to write meaningless AC just to satisfy the gate. Scoping the requirement to the two work item types that conventionally carry real Acceptance Criteria keeps the signal clean.

### Step 3 — HTML Acceptance Criteria → testable BDD Markdown

Azure DevOps stores Acceptance Criteria as rich-text HTML (`Microsoft.VSTS.Common.AcceptanceCriteria`). Free-form HTML is exactly the kind of input a review model handles inconsistently — inline styling, non-semantic `<div>` soup, and no structural signal about which sentence is a distinct, checkable condition. The workflow normalises it in two stages, with a graceful degradation path baked in:

```
if pandoc is available on the runner:
    clean_ac = pandoc(html_ac, from="html", to="gfm")
else:
    clean_ac = perl_regex_strip(html_ac)   # </p>, <br>, <li> -> line breaks / bullets
```

That `else` branch matters more than it looks. GitHub-hosted runners generally ship `pandoc`, but self-hosted runners — common in exactly the kind of public-sector environment this repo lives in — often don't, and a workflow that hard-fails the moment one binary is missing is a workflow that will page someone at 2 a.m. for a wholly avoidable reason. The fallback intentionally degrades gracefully (regex stripping is less precise than `pandoc`, but it still produces usable Markdown) rather than failing outright — that's a resilience pattern, not a shortcut.

The result is then run through a small Python3 formatter (invoked inline via `python3 -c "..."`) that restructures the text into numbered BDD scenarios:

```
for each line in the cleaned text:
    if line matches "Scenario <n>: <title>":
        emit "<n>. **Scenario <n>:** <title>" as a new numbered item
    elif line starts with Given / When / Then / And / But:
        emit it as an indented bullet under the current scenario
    else:
        emit it as an indented bullet (plain criterion, no BDD structure detected)
```

Why bother reshaping free text into `Given/When/Then` structure at all, rather than just pasting the raw HTML-stripped AC into the PR? Because **Given/When/Then is a structural contract Copilot can pattern-match against a diff**. "The system should handle errors gracefully" is a sentence a reviewer has to interpret. "**Given** an invalid postcode is submitted, **When** the form is validated, **Then** a specific error message is shown and the request is not sent" is a *test case* — it names a precondition, an action, and an observable outcome, each of which either does or does not have corresponding code in the diff. This reformatting step is, in effect, prompt engineering performed on structured data before the prompt is even assembled — turning ambiguous prose into scaffolding the reviewing model can actually apply.

### Step 4 — idempotent injection, not blind appending

```javascript
const blockRegex = /<!-- ado-context:start -->[\s\S]*?<!-- ado-context:end -->/m;
if (blockRegex.test(existingBody)) {
  nextBody = existingBody.replace(blockRegex, contextBlock);   // resync
} else {
  nextBody = `${existingBody.trim()}\n\n${contextBlock}`.trim(); // first insert
}
if (nextBody === existingBody) { return; }   // no-op, avoid a pointless PR update event
```

Two things earn their keep here. The delimited-block regex means Gate 1 can run dozens of times across a PR's life (every `synchronize` on every push) and always **replace** the previous snapshot rather than stacking duplicates. And the explicit no-op check when the computed body is identical to the existing one prevents the workflow from triggering its own `edited` event in a loop — a subtle but real hazard whenever an Action writes back to the trigger it's watching.

### Step 5 — request Copilot, tolerate the 422

```
POST /repos/{repo}/pulls/{pr}/requested_reviewers  { "reviewers": ["copilot"] }

if request fails:
    if error message matches /already requested|unprocessable|already.*reviewer/:
        log a warning, continue (non-fatal)
    else:
        fail the job
```

then verifies Copilot actually shows up in `requested_reviewers` afterwards — a belt-and-braces observability check, because a silent, best-effort review request that never actually happened is worse than an explicit failure.

## The core insight: how this actually re-wires Copilot's effective context

This is the part of the design that matters most, and it's worth being precise about what's demonstrably true versus what's aspirational, because GitHub's own documentation on this is specific and has evolved recently.

According to GitHub's current documentation for Copilot code review (the automated bot triggered by requesting "Copilot" as a reviewer — exactly what Gate 1 does), the bot reliably reads two categories of repository-authored context: repository-wide instructions in `.github/copilot-instructions.md`, and path-scoped instructions in `.github/instructions/*.instructions.md` (with an `excludeAgent` property to keep specific files out of code review specifically). GitHub also recently extended automated code review to read a root-level `AGENTS.md` file when present. All of this is retrieved from the **base branch** of the PR — so updates to these files only take effect once merged, not from the feature branch itself.

That gives Gate 1's injected `<!-- ado-context -->` block real teeth: because it's written directly into the **PR description**, and the PR description is unambiguously part of what an automated PR review is evaluating, the Acceptance Criteria travel into Copilot's working context through the most direct channel available — the artifact it's reviewing — rather than depending on a secondary instructions file being fetched correctly.

`copilot-instructions.md` in this repository does the second job: it hard-codes the review's *process*, not the *requirements*. It tells Copilot to treat the `ado-context` block as authoritative, to compare the diff against each criterion individually rather than assuming correctness, to fail closed when the AC block is missing or stale, and — critically — to end every review with exactly one machine-parseable `AC-STATUS:` marker as the last non-empty line. It also does real review-quality work unrelated to compliance: scoping Playwright-specific guidance, suppressing cosmetic nits, and capping comment volume so the compliance signal doesn't drown in style noise.

The `requirements-reviewer.agent.md` file is where a fair, evidence-based critique is due. Custom `.agent.md` agent profiles are a real, well-documented GitHub Copilot feature — but as of GitHub's current published documentation, they are explicitly a mechanism for **interactively selected personas** in Copilot Chat, the CLI, and IDEs (VS Code, Visual Studio), not a documented input to the automated, requested-reviewer PR-review bot that Gate 1 invokes. There is no public GitHub documentation confirming that dropping a file in `.github/agents/*.agent.md` automatically changes the behaviour of the automated "Copilot" reviewer the same way `copilot-instructions.md` does. In practice, this means the persona file in this repository is best understood today as **documentation-as-code and a portable specification** — genuinely useful for a human who opens Copilot Chat or the CLI and deliberately selects it, and valuable as the canonical, version-controlled description of what "good" looks like for this review task — but not something you should assume the automated bot is reading purely because the file exists in `.github/agents/`. If you want its rules to shape the automated review specifically, the documented path is to fold the operative rules into `copilot-instructions.md` (as this repository has, sensibly, mostly already done) or into `AGENTS.md`. The safest verification step is to open the Copilot review session referenced from the PR timeline after a run and check which context sources it actually reports using, rather than assuming.

None of that diminishes the design — three layers of context, even where one is currently more aspirational than guaranteed, is still a materially better starting point than zero — but it's the kind of nuance worth knowing before you rely on it for a compliance-critical gate.

## Gate 2 — fail-closed verdict parsing: why ambiguity must never resolve to PASS

Gate 2 (`gate2-enforcement.yml`) is the enforcement half, and its defining engineering property is that **every ambiguous, malformed, or unrecognised state resolves to NEEDS-WORK, never to PASS.** That single design principle, applied consistently, is what makes the gate trustworthy.

### Identity gating comes before anything else

```yaml
if: |
  github.event.review.user.type == 'Bot' &&
  contains(fromJson('["github-copilot[bot]","copilot-pr-reviews[bot]"]'), github.event.review.user.login)
```

The comment in the source is explicit about *why* this is an exact-match allow-list rather than `contains(login, 'copilot')`: a substring check would let anyone create a bot account with "copilot" anywhere in its name and post a fabricated `AC-STATUS: PASS` review that the workflow would treat as authoritative. This is the direct engineering answer to Problem 4 above — the trust boundary is drawn as narrowly as the two specific, known bot identities that are actually allowed to render a verdict. (One practical operating note: these exact login strings should be re-verified against your own installation periodically — GitHub bot identities for a given feature aren't guaranteed to stay static forever, and the cheapest way to confirm the current value is to inspect `review.user.login` on an actual Copilot review event in your repository.)

### The verdict parser, as pseudocode

```
normalise line endings (CRLF -> LF)
count_pass, count_needs_work, count_na = count exact full-line matches of each marker
total = count_pass + count_needs_work + count_na
last_line = the last non-blank line of the review body

if total > 1:
    verdict = NEEDS-WORK   # conflicting markers -> never trust an ambiguous signal
elif total == 1 and last_line is not one of the three exact marker strings:
    verdict = NEEDS-WORK   # marker present, but "last line" contract violated -> untrusted
elif total == 1 and last_line matches the single marker found:
    verdict = that marker  # PASS / NEEDS-WORK / NOT-APPLICABLE, explicitly confirmed
else:
    # no machine-readable marker anywhere — fall back to the review's own state
    match review_state:
        "approved"           -> PASS
        "changes_requested"  -> NEEDS-WORK
        "commented"          -> NEEDS-WORK   # note: NOT treated as a pass
        anything else        -> NEEDS-WORK, with a warning logged
```

Two of these branches deserve a second look because they're easy to get wrong. The **"marker present but not on the last line"** rule exists because a review body could legitimately contain the *string* `AC-STATUS: PASS` inside an explanatory sentence or a quoted example without it being the actual verdict — anchoring to "last non-empty line" turns a fuzzy text-search problem into a structural contract, and violating that contract is itself treated as a failure signal, not silently ignored. The **`commented` review state mapping to NEEDS-WORK, not PASS**, closes an obvious loophole: a GitHub PR review submitted with the "Comment" state (as opposed to "Approve") carries no inherent approval semantics, so treating it as a pass by default would let a purely conversational Copilot response — one that never actually reached a compliance verdict — silently satisfy the gate.

### Enforcement is the only thing that blocks the merge

```bash
case "${VERDICT:-NEEDS-WORK}" in
  PASS|NOT-APPLICABLE) exit 0 ;;
  *)                   echo "::error::..."; exit 1 ;;
esac
```

Everything before this — the idempotent PR comment (matched and updated via an HTML comment marker, same pattern as Gate 1's context block), the Azure DevOps work-item comment write-back (skipped gracefully, not fatally, if `ADO_PAT`/`ADO_ORG`/`ADO_PROJECT` aren't configured, and skipped if the PR body's AB# count isn't exactly one), and the published Check Run — all run under `if: always()` and never block anything by themselves. Only this final job step's exit code, surfaced as the required "ADO Acceptance Criteria Gate" Check Run, is wired into branch protection. That's a clean, deliberate separation between *telling people what happened* and *deciding whether the merge is allowed* — and it means a transient Azure DevOps outage during the write-back step degrades to "the ADO comment didn't get posted" rather than "the PR is now unmergeable for an unrelated reason."

## The full lifecycle, end to end


| # | Actor                           | Trigger                                                                                                               | What happens                                                                                                                                                                                  |
| - | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Developer                       | Opens a PR                                                                                                            | Description must contain exactly one`AB#<id>` reference, e.g. `Fixes AB#4821`                                                                                                                 |
| 2 | Gate 1                          | `pull_request`: opened / edited / synchronize / reopened                                                              | Parses the AB# reference; fails fast if zero or multiple matches                                                                                                                              |
| 3 | Gate 1 → Azure DevOps          | (same run)                                                                                                            | Authenticated REST call fetches work item type, title, and Acceptance Criteria                                                                                                                |
| 4 | Gate 1                          | (same run)                                                                                                            | Classifies IN-SCOPE vs EXEMPT; converts HTML AC to Given/When/Then Markdown (pandoc, with a regex fallback)                                                                                   |
| 5 | Gate 1 → GitHub                | (same run)                                                                                                            | Injects/refreshes the`<!-- ado-context:start/end -->` block in the PR description; requests Copilot as a reviewer                                                                             |
| 6 | GitHub Copilot                  | Requested-reviewer assignment                                                                                         | Reads the diff, the PR description (including the injected AC),`copilot-instructions.md`, and (if present) `AGENTS.md`; submits a structured review ending in exactly one `AC-STATUS:` marker |
| 7 | Gate 2                          | `pull_request_review: submitted` (or a qualifying `issue_comment`), restricted to allow-listed Copilot bot identities | Parses the verdict using the fail-closed rules above                                                                                                                                          |
| 8 | Gate 2 → GitHub / Azure DevOps | (same run)                                                                                                            | Posts/updates an idempotent PR comment; writes an HTML-formatted comment back to the ADO work item; publishes the "ADO Acceptance Criteria Gate" Check Run                                    |
| 9 | Branch protection               | Required status check evaluation                                                                                      | Merge stays blocked unless the Check Run concluded`success` (PASS) or `neutral` (NOT-APPLICABLE)                                                                                              |

A concrete walk-through, using the actual run captured in the diagram above: a PR is opened against `AB#4821`, whose Acceptance Criteria describe two scenarios for a compliance-registration modal — a console-log statement must fire once on initialisation, and it must still fire even when the modal itself is never launched. Gate 1 fetches the item, confirms it's a User Story (in scope), and injects both scenarios into the PR body as numbered Given/When/Then steps. Copilot is requested and reviews the diff against them. The first run, on 25 June, comes back `NEEDS-WORK` — not because the scenarios were unmet, but because that review carried no explicit `AC-STATUS` marker at all; Copilot had submitted a plain `COMMENTED` review, and Gate 2's fallback logic — the same "commented is not sufficient" rule described above — correctly refuses to treat that as a pass. After the gap is addressed, a second run on 29 June returns a review whose last line explicitly reads `AC-STATUS: PASS`. Gate 2 fires on that `pull_request_review` event, confirms the reviewer identity is the allow-listed Copilot bot, parses the trailing marker, comments the verdict and reason back onto the PR (exactly as shown in the diagram), posts the same summary onto work item 4821 in Azure DevOps, and publishes a passing Check Run — at which point branch protection allows the merge, and the change proceeds to deploy.

## Setting it up

### 1. Create the Azure DevOps Personal Access Token (`ADO_PAT`)

In Azure DevOps, go to **User Settings → Personal Access Tokens → New Token**. Scope it to the **Work Items** permission with **Read & Write** (Read is needed to fetch the work item and its Acceptance Criteria in Gate 1; Write is needed for Gate 2's comment write-back). Set an explicit, reasonable expiry and calendar a renewal — an expired PAT fails Gate 1 for every PR in the repository simultaneously, so treat its expiry like you would a certificate's. Scope the token as narrowly as your Azure DevOps organisation structure allows (project-level rather than organisation-wide, if your process permits it).

### 2. Configure `ADO_ORG` and `ADO_PROJECT`

These map directly to the URL segments in `https://dev.azure.com/{ADO_ORG}/{ADO_PROJECT}/...` — `ADO_ORG` is your Azure DevOps organisation name, `ADO_PROJECT` is the specific project. If your project name contains spaces or special characters, it must already be URL-encoded when you set the variable (the workflow interpolates it directly into the request URL without re-encoding it).

### 3. Add them to the GitHub repository

In the GitHub repository, go to **Settings → Secrets and variables → Actions**:

- Under the **Secrets** tab, add `ADO_PAT` as a repository secret.
- Under the **Variables** tab, add `ADO_ORG` and `ADO_PROJECT` as repository variables.

Secrets and variables are deliberately split here: the PAT is sensitive and masked in logs; the org and project names are not secret and are more convenient to inspect and edit as plain variables. If Gate 1 detects any of the three missing, it fails the job explicitly with a named error rather than silently skipping the ADO fetch — treat a missing `ADO_PAT` as a hard configuration error, not an edge case to route around.

### 4. Enable GitHub Copilot code review on the repository

Under repository settings, ensure Copilot code review is enabled and that repository custom instructions are enabled for it (this is on by default, but worth confirming explicitly — it can be disabled per-repository). Add `.github/copilot-instructions.md` at the repository root; this repository's version is a strong starting reference. If you also maintain a root `AGENTS.md`, be aware Copilot code review will now read that too, so keep the two from contradicting each other.

### 5. Wire up branch protection

In **Settings → Branches → Branch protection rules** for your target branch, add **"ADO Acceptance Criteria Gate"** (the exact Check Run name published by Gate 2) as a required status check. Also require Gate 1's job (`sync-ado-context`) to succeed, since a PR that never got its context injected should never be mergeable either, independent of what Copilot later says about it.

### 6. Grant the workflows the right GitHub permissions

Both workflows declare their own `permissions:` blocks (`contents: read`, `pull-requests: write`, `issues: write`, `checks: write` as needed) rather than relying on a broad default — confirm your organisation's Actions permission policy doesn't override these down to read-only, or the PR-body injection and Check Run publication steps will fail silently against an insufficiently scoped `GITHUB_TOKEN`.

## Critique: where this design is strong, and where it genuinely isn't

The strongest part of this design is the discipline around ambiguity: nowhere in either workflow does an unrecognised state default to success. That is the single most important property a merge-blocking gate can have, and it's applied consistently across both the AB# parser and the verdict parser.

That said, an honest technical review has to name the real limitations too, not just the strengths.

The AB# extraction is a plain regex over the entire PR body, so it will match `AB#4821` regardless of where it appears — including inside a code block showing a log line, a quoted comment, or an unrelated example in the description. In practice this is a low-frequency edge case, but it's a real one, and a team that pastes stack traces referencing ticket numbers into PR descriptions could trip the "exactly one" rule unexpectedly.

The single-work-item-per-PR constraint is a clean, simple rule, and it's the right default — but it doesn't fit every real workflow. Stacked PRs that close out several sub-tasks of one epic, or a single infrastructure PR that happens to satisfy two independent tickets, don't have a clean way to express "two AB# references, both intentional" today; the gate will reject them as ambiguous.

The entire enforcement mechanism ultimately rests on parsing natural-language output from a non-deterministic model for one specific trailing string. `copilot-instructions.md` and the agent persona both work hard to constrain this (exactly one marker, must be the last line), and the fail-closed defaults absorb most of the risk — but the underlying dependency is still "an LLM correctly follows a formatting instruction on every single review," and GitHub's own documentation for Copilot code review explicitly acknowledges non-deterministic behaviour as a known limitation of the product. This is a brittleness the design manages well, rather than one it eliminates.

As covered above, the `.agent.md` persona file's actual influence over the *automated* review path is not confirmed by current public documentation, which means the repository is, right now, doing more compliance-relevant work through `copilot-instructions.md` than the custom-agent framing might suggest at first glance.

Finally, Gate 1 re-syncs on every `synchronize`/`edited` event on the *GitHub* side, but there's no equivalent trigger from the *Azure DevOps* side — if someone edits the Acceptance Criteria on work item 4821 after the PR was opened and the PR itself doesn't receive a new commit or description edit, the injected context snapshot will quietly go stale relative to the live requirement until the next PR-side event forces a re-sync.

## Innovative extensions worth building next

A few directions would meaningfully harden or extend this design, in roughly ascending order of effort:

Move from prose-embedded verdict markers to a **structured, code-owned artifact** — have Copilot's review (or a thin wrapper Action parsing it) write the verdict as annotations on the published Check Run itself, rather than relying purely on a specific trailing string inside a Markdown review body. This removes the "must be the exact last line" fragility entirely by shifting the contract from natural language to structured API fields.

Add **multi-work-item support** for stacked or epic-spanning PRs, with the compliance verdict computed as an aggregate across all linked items rather than assumed to be exactly one — this is a moderate change to the regex/count logic in Gate 1 and the ADO write-back loop in Gate 2, not a redesign.

Introduce a **drift check**: on every Gate 1 run, compare the Acceptance Criteria hash currently injected in the PR against the live value fetched from Azure DevOps, and post a distinct warning comment — separate from the compliance verdict — if they differ, so a stale review is visibly flagged rather than silently trusted.

Add a **semantic coverage score** rather than a binary verdict: use embeddings or a secondary lightweight model call to estimate, per Given/When/Then scenario, how directly it's addressed by the diff, and surface that as a supplementary artifact (a PR comment table, say) alongside — not instead of — the binary PASS/NEEDS-WORK gate that actually blocks the merge. Binary gates should stay binary and auditable; richer signal belongs in advisory output next to it, not inside the enforcement path itself.

Finally, wire an **auto-remediation loop**: on a `NEEDS-WORK` verdict, have Gate 2 open a follow-up task for GitHub Copilot's coding agent, seeded with the specific unmet scenario and the existing diff, so the "what's missing" analysis a human would otherwise have to re-derive from the review comment is handed straight to an agent capable of proposing the fix as a new commit for human review.

## Key takeaways

🎯 **The problem isn't AI review quality — it's AI review context.** Copilot reviews what it's shown. Feeding it the actual Acceptance Criteria, structurally reformatted as testable scenarios, converts a generic code-quality pass into a requirements audit.

🔒 **Fail-closed is the whole ballgame.** Every ambiguous state in this pipeline — conflicting markers, malformed contracts, unrecognised review states, unlisted bot identities — resolves to "not passing." That single discipline, applied without exception, is what makes a merge-blocking automated gate trustworthy.

🧩 **Separate observability from enforcement.** PR comments and ADO write-backs run `always()` and never block anything; only one Check Run and one `exit` code decide the merge. That split means partial failures degrade gracefully instead of cascading.

📚 **Know what's actually documented versus merely plausible.** `copilot-instructions.md` and (recently) root `AGENTS.md` are confirmed inputs to automated Copilot code review; a `.github/agents/*.agent.md` custom persona, as of today's public documentation, is confirmed for interactive Copilot Chat/CLI use but not for the automated PR-review bot — a distinction worth verifying against your own review session logs before you depend on it.

🔁 **Idempotency prevents self-inflicted chaos.** Both the injected ADO context block and the PR compliance comment are matched by HTML-comment markers and replaced in place, with explicit no-op checks — without that, a workflow that edits the very PR it's triggered by can trigger itself in a loop.

---

*Reference documentation consulted for the Copilot code review context-loading behaviour described above: GitHub Docs — "Using GitHub Copilot code review," "Adding repository custom instructions for GitHub Copilot," and the GitHub Changelog entries on agent-specific instructions and AGENTS.md support for code review (github.blog/changelog, docs.github.com/copilot).*

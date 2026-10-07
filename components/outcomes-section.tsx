const commitments = [
  { title: "Agree", text: "Define the outcome and how it will be measured, before work begins." },
  { title: "Deliver", text: "Move through ideation, solution design and productionizing." },
  { title: "Measure", text: "Check the result against what was agreed, then hand over." },
]

export function OutcomesSection() {
  return (
    <section className="outcomes-section section-wrap section-rule">
      <div className="outcomes-section__intro">
        <p className="eyebrow">03 / The promise</p>
        <h2 className="editorial-title">Outcomes you can hold us to.</h2>
        <p>Every engagement starts by agreeing what success looks like and how it will be measured. The work then moves through the three stages, and the result is checked against what was agreed.</p>
        <p className="body-muted">Confirm the delivery model and who delivers before publication.</p>
      </div>
      <div className="outcome-list">
        {commitments.map((item) => (
          <article className="outcome-list__item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
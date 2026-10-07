import Image from "next/image"

const stages = [
  {
    number: "01",
    title: "Ideation",
    description: "Simplify a complex idea into a clearly defined problem, with success measures agreed up front.",
    outputs: "Discovery, framing, feasibility, agreed measures.",
    art: "stage-art--ideas",
    image: "/images/system-ideation.svg",
  },
  {
    number: "02",
    title: "Solution design",
    description: "Map the software, data flows, roadmap and evaluation approach to meet those measures.",
    outputs: "System design, data flows, evaluation criteria, delivery plan.",
    art: "stage-art--design",
    image: "/images/system-design.svg",
  },
  {
    number: "03",
    title: "Productionizing",
    description: "Build, integrate and hand over a solution that works in production and can be measured there.",
    outputs: "Build, integration, evaluation, support and handover.",
    art: "stage-art--production",
    image: "/images/system-production.svg",
  },
]

export function StagesSection() {
  return (
    <section id="stages" className="stages-section section-wrap section-rule">
      <div className="section-heading">
        <p className="eyebrow">02 / How we work</p>
        <h2 className="editorial-title">Idea to operation, in three stages.</h2>
      </div>
      <div className="stage-sequence" aria-label="Ideation, then solution design, then productionizing">
        {stages.map((stage, index) => (
          <div className="stage-sequence__item" key={stage.number}>
            {index > 0 && <span aria-hidden="true" className="stage-sequence__arrow">→</span>}
            <span>{stage.title}</span>
          </div>
        ))}
      </div>
      <div className="stage-grid">
        {stages.map((stage) => (
          <article className="stage-item" key={stage.number}>
            <div className={`stage-art ${stage.art}`}>
              <Image src={stage.image} alt="" fill sizes="(max-width: 720px) 90vw, 33vw" />
            </div>
            <p className="stage-item__number">{stage.number}</p>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
            <p className="stage-item__outputs">{stage.outputs}</p>
          </article>
        ))}
      </div>
      <p className="stage-capabilities">Applied AI, cloud and software engineering capabilities sit inside these stages, not beside them.</p>
    </section>
  )
}
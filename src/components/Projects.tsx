import Section from "@/components/Section";
import { projects } from "@/data/profile";

export default function Projects() {
  return (
    <Section id="loot" title="Loot" subtitle="Things I've built. Gold cartridges won something.">
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li
            key={p.title}
            className={`px-box flex flex-col transition-transform duration-100 hover:-translate-y-1 ${
              p.award ? "outline outline-4 outline-gold" : ""
            }`}
          >
            {/* Cartridge label */}
            <div className="relative m-3 mb-0 flex h-24 items-end p-3" style={{ background: p.color }}>
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #0b0a1a 0 4px, transparent 4px 12px)",
                }}
                aria-hidden="true"
              />
              <h3 className="relative font-pixel text-2xl leading-none text-edge">{p.title}</h3>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              {(p.award || p.metric) && (
                <p className={`text-xs ${p.award ? "text-gold" : "text-mint"}`}>
                  {p.award ? `★ ${p.award}` : p.metric}
                </p>
              )}
              {p.award && p.metric && <p className="text-xs text-mint">{p.metric}</p>}
              <p className="flex-1 text-sm leading-relaxed text-ink">{p.blurb}</p>
              <ul className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="bg-sky-deep px-2 py-1 text-xs text-ink-dim">{t}</li>
                ))}
              </ul>
              <div className="mt-2 flex gap-5">
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="px-link">
                    Code ↗
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="px-link">
                    Play ↗
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

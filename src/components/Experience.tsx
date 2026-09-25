import Section from "@/components/Section";
import { experiences } from "@/data/profile";

export default function Experience() {
  return (
    <Section id="quests" title="Quest log" subtitle="Roles I've taken on, most recent first.">
      <ol className="flex flex-col gap-8">
        {experiences.map((e) => (
          <li key={e.company} className="px-box p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs text-ink-dim">
                  <span className={e.active ? "text-gold" : "text-mint"}>
                    {e.active ? "▶ In progress" : "✔ Complete"}
                  </span>
                  {" · "}
                  {e.period}
                </p>
                <h3 className="mt-2 font-pixel text-2xl text-ink">{e.role}</h3>
                <p className="text-coral">
                  @ {e.company} <span className="text-ink-dim">· {e.location}</span>
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {e.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span className="text-mint" aria-hidden="true">+</span>
                  <span className="max-w-[75ch]">{b}</span>
                </li>
              ))}
            </ul>
            {e.link && (
              <a href={e.link} target="_blank" rel="noopener noreferrer" className="px-link mt-4 inline-block">
                View PR ↗
              </a>
            )}
            <ul className="mt-5 flex flex-wrap gap-2">
              {e.tags.map((t) => (
                <li key={t} className="bg-sky-deep px-2 py-1 text-xs text-ink-dim">{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

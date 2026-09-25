import Section from "@/components/Section";
import { skills } from "@/data/profile";

export default function Skills() {
  return (
    <Section id="skills" title="Inventory" subtitle="Tools I reach for.">
      <div className="grid gap-8 md:grid-cols-3">
        {skills.map((g) => (
          <div key={g.group} className="px-box p-5">
            <h3 className="mb-4 font-pixel text-xl text-gold">{g.group}</h3>
            <ul className="grid grid-cols-2 gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="flex min-h-11 items-center bg-sky-deep px-3 py-2 text-sm text-ink shadow-[inset_2px_2px_0_0_var(--edge)]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

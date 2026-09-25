import PixelAvatar from "@/components/PixelAvatar";
import Section from "@/components/Section";
import { profile, stats } from "@/data/profile";

export default function About() {
  return (
    <Section id="about" title="Player">
      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        <div className="px-box flex flex-col items-center gap-5 p-6">
          <PixelAvatar src="/headshot.jpg" alt={profile.name} />
          <dl className="w-full space-y-2 text-sm">
            {[
              ["Name", profile.name],
              ["Class", profile.title],
              ["Guild", "UCLA CS"],
              ["Level", `'${profile.gradYear.slice(2)}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b-2 border-dashed border-panel-hi pb-1">
                <dt className="text-ink-dim">{k}</dt>
                <dd className="text-right text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-4 text-base leading-relaxed text-ink">
            {profile.bio.map((p) => (
              <p key={p} className="max-w-[68ch]">{p}</p>
            ))}
          </div>

          <ul className="grid grid-cols-3 gap-5">
            {stats.map((s) => (
              <li key={s.label} className="px-box p-4 text-center">
                <p className="font-pixel text-4xl text-gold">{s.value}</p>
                <p className="mt-1 text-xs text-ink-dim">{s.label}</p>
              </li>
            ))}
          </ul>

          <a href={profile.resume} className="px-link w-fit text-lg">
            ▸ Open resume.pdf
          </a>
        </div>
      </div>
    </Section>
  );
}

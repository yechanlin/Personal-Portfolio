import Section from "@/components/Section";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <Section id="save" title="Save point">
      <div className="px-box mx-auto max-w-2xl p-8 text-center sm:p-12">
        <p className="font-pixel text-3xl text-ink sm:text-4xl">Save your progress?</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-dim">
          I&apos;m looking for internships and new-grad roles for 2027. Got a role or a
          project in mind? My inbox is open.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          <a href={`mailto:${profile.email}`} className="px-btn">✉ Email me</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="px-btn px-btn--ghost">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="px-btn px-btn--ghost">
            GitHub ↗
          </a>
        </div>
        <p className="mt-6 text-xs text-ink-dim">{profile.email}</p>
      </div>
    </Section>
  );
}

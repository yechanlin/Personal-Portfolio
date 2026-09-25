import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="px-4 py-10 text-center text-xs text-ink-dim">
      <p>
        © {new Date().getFullYear()} {profile.name} · built with Next.js · no pixels were harmed
      </p>
    </footer>
  );
}

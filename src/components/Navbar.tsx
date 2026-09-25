"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const links = [
  { label: "About", href: "#about" },
  { label: "Quests", href: "#quests" },
  { label: "Loot", href: "#loot" },
  { label: "Skills", href: "#skills" },
  { label: "Save", href: "#save" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? "bg-sky-deep/95 shadow-[0_4px_0_0_var(--edge)]" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="px-link text-xl text-ink" onClick={() => setOpen(false)}>
          <span className="text-coral">▲</span> {profile.handle}
        </a>

        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-link block px-3 py-1 text-base text-ink-dim hover:bg-panel hover:text-gold"
              >
                [{l.label}]
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a href={profile.resume} className="px-btn px-btn--mint !px-3 !py-2 text-sm">
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="px-btn px-btn--ghost !px-3 !py-2 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="flex flex-col gap-1 px-4 pb-5 sm:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-link block px-2 py-2 text-xl text-ink hover:bg-panel"
              >
                ▸ {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} className="px-link block px-2 py-2 text-xl">
              ▸ Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}

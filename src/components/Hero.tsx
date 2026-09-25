"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

function useTyped(text: string, speed = 35) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

export default function Hero() {
  const typed = useTyped(profile.tagline);

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-4 pb-20 pt-28 sm:px-6"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6 inline-flex w-fit items-center gap-2 bg-panel px-3 py-1.5 text-xs text-mint shadow-[0_0_0_2px_var(--edge)]"
      >
        <span className="inline-block h-2 w-2 bg-mint" aria-hidden="true" />
        {profile.status}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-pixel text-6xl leading-[0.95] text-ink [text-shadow:4px_4px_0_var(--edge)] sm:text-8xl lg:text-9xl"
      >
        Ye Chan
        <br />
        <span className="text-coral">Lin</span>
      </motion.h1>

      <p className="mt-8 min-h-[3.5rem] max-w-2xl font-mono text-lg text-ink sm:text-xl">
        <span className="text-mint">$ </span>
        <span className="cursor-blink">{typed}</span>
      </p>

      <p className="mt-2 max-w-2xl text-sm text-ink-dim">
        {profile.title} · {profile.school} · Class of {profile.gradYear}
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-10 flex flex-wrap gap-5"
      >
        <a href="#loot" className="px-btn">▶ Start</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="px-btn px-btn--ghost">
          GitHub ↗
        </a>
      </motion.div>

      <p className="absolute bottom-8 left-4 hidden text-xs text-ink-dim/70 sm:left-6 sm:block">
        tip: click the sky to scatter the clouds
      </p>
    </section>
  );
}

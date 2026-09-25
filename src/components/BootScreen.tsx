"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "BIOS v2.7 · UCLA-CS",
  "loading yechanlin.exe ...",
  "mounting /projects ...... OK",
  "spawning player ......... OK",
];

const KEY = "boot-seen";

// Plays once per browser session. Skipped entirely under reduced motion.
export default function BootScreen() {
  const [show, setShow] = useState(false);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only gate after reading sessionStorage
    setShow(true);
    const timers = LINES.map((_, i) => setTimeout(() => setLines(i + 1), 180 + i * 230));
    timers.push(setTimeout(() => setShow(false), 180 + LINES.length * 230 + 700));

    const skip = () => setShow(false);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "linear" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-sky-deep px-6"
          role="status"
          aria-label="Loading"
        >
          <div className="w-full max-w-md font-mono text-sm text-ink-dim">
            {LINES.slice(0, lines).map((l) => (
              <p key={l} className="leading-7">
                <span className="text-mint">&gt;</span> {l}
              </p>
            ))}
            {lines === LINES.length && (
              <p className="mt-6 font-pixel text-2xl text-coral cursor-blink">PRESS START</p>
            )}
            <p className="mt-10 text-xs text-ink-dim/60">press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

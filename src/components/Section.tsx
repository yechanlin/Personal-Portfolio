"use client";

import { motion } from "framer-motion";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Section({ id, title, subtitle, children }: Props) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-10"
      >
        <h2 className="font-pixel text-3xl text-ink sm:text-5xl">
          <span className="text-coral" aria-hidden="true">▸ </span>
          {title}
        </h2>
        {subtitle && <p className="mt-3 max-w-xl text-sm text-ink-dim">{subtitle}</p>}
      </motion.header>
      {children}
    </section>
  );
}

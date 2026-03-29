"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const links = [
  { label: "GitHub", handle: "@yechanlin", href: "https://github.com/yechanlin", emoji: "💻" },
  { label: "LinkedIn", handle: "yechanlin", href: "https://linkedin.com/in/yechanlin", emoji: "💼" },
  { label: "Email", handle: "yechanlin15703@gmail.com", href: "mailto:yechanlin15703@gmail.com", emoji: "✉️" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section px-6 max-w-4xl mx-auto">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center gap-6"
        >
          <span className="text-4xl">👋</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Let&apos;s work{" "}
            <span className="gradient-text">together.</span>
          </h2>
          <p className="text-slate-500 max-w-md leading-relaxed">
            I&apos;m actively looking for internships and new-grad opportunities.
            Have a role in mind or a project to build? Let&apos;s talk.
          </p>

          <a
            href="mailto:yechanlin15703@gmail.com"
            className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5"
          >
            Say Hello
          </a>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-600 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{l.emoji}</span>
                <div className="text-left leading-tight">
                  <p className="font-semibold text-xs text-slate-400">{l.label}</p>
                  <p className="text-xs">{l.handle}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

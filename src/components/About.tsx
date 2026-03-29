"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const stats = [
  { label: "Internships", value: "2×" },
  { label: "Hackathon Win", value: "🏆" },
  { label: "Graduating", value: "'27" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section px-6 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase">About Me</span>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Avatar & stats */}
          <div className="flex flex-col gap-6">
            <div className="glass rounded-3xl p-6 flex flex-col items-center gap-4">
              <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/headshot.jpg"
                  alt="Ye Chan Lin"
                  width={144}
                  height={144}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-700 text-lg">Ye Chan Lin</p>
                <p className="text-sm text-slate-400">UCLA · B.S. Computer Science · Class of 2027</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center">
                  <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="glass rounded-3xl p-8 flex flex-col gap-5">
            <h2 className="text-3xl font-bold text-slate-800 leading-tight">
              A little bit about{" "}
              <span className="gradient-text">me.</span>
            </h2>
            <p className="text-slate-500 leading-relaxed">
              I&apos;m a CS student at UCLA with hands-on experience building production
              systems — from geospatial ETL pipelines on AWS to full-stack web platforms
              serving thousands of users.
            </p>
            <p className="text-slate-500 leading-relaxed">
              I&apos;ve interned at Boundary RSS and CodeDay Labs, led the software team
              for a Mars rover robotics project, and won best use of AWS at BruinAI Hackathon.
              I care about writing clean, well-tested code that actually ships.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Python", "TypeScript", "React", "Node.js", "AWS", "Docker"].map((t) => (
                <span
                  key={t}
                  className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-xl text-xs font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors mt-1"
            >
              View Resume →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

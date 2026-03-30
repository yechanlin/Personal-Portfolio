"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.65, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative">
      {/* Badge */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="glass-dark inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-blue-600 mb-6"
      >
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        Open to opportunities · UCLA CS &apos;27
      </motion.div>

      {/* Name */}
      <motion.h1
        custom={1}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="text-5xl sm:text-7xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4"
      >
        Hi, I&apos;m{" "}
        <span className="gradient-text">Ye Chan Lin</span>
      </motion.h1>

      {/* Role */}
      <motion.p
        custom={2}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="text-xl sm:text-2xl font-medium text-slate-400 mb-6"
      >
        Software Engineer &amp; CS Student at UCLA
      </motion.p>

      {/* Description */}
      <motion.p
        custom={3}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="max-w-xl text-base text-slate-500 leading-relaxed mb-10"
      >
        I build full-stack web apps and data pipelines — from React frontends to
        AWS-integrated backends. 2× software engineer intern, hackathon winner,
        and robotics team lead.
      </motion.p>

      {/* CTAs */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5"
        >
          View My Work
        </a>
        <a
          href="https://github.com/yechanlin"
          target="_blank"
          rel="noopener noreferrer"
          className="glass px-6 py-3 rounded-2xl text-slate-600 font-semibold text-sm hover:text-blue-600 transition-all duration-200 hover:-translate-y-0.5"
        >
          GitHub ↗
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-slate-300 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}

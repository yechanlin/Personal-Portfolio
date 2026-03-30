"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "NEXUS",
    description:
      "Full-stack swipe-based platform connecting 1000+ students to project collaborators. Built RESTful APIs with Express/Node and deployed on MongoDB Atlas with a migration plan to AWS for scale.",
    tags: ["React.js", "Express.js", "Node.js", "MongoDB"],
    accent: "from-blue-500 to-sky-500",
    emoji: "🔗",
    github: "https://github.com/yechanlin",
    live: "#",
  },
  {
    title: "ClubApply.ai",
    description:
      "AI-powered assistant for 1200+ UCLA clubs that generates personalized application tips. Won Best Use of AWS Technologies at BruinAI Hackathon. Used multi-agent workflows with AWS Bedrock.",
    tags: ["FastAPI", "React.js", "AWS Bedrock", "Python"],
    accent: "from-slate-600 to-slate-800",
    emoji: "🏆",
    badge: "Hackathon Winner",
    github: "https://github.com/yechanlin",
    live: "#",
  },
  {
    title: "Resume Management System",
    description:
      "Visual resume management platform with graph-based UI for organizing CVs by job role. AI-powered resume generation from job descriptions. Led a team of 4, reducing resume-building time by 60%.",
    tags: ["React.js", "Django", "SQLite", "Python"],
    accent: "from-cyan-500 to-blue-600",
    emoji: "📄",
    github: "https://github.com/yechanlin",
    live: "#",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section px-6 max-w-6xl mx-auto">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase">Projects</span>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-800 mb-10"
        >
          Things I&apos;ve{" "}
          <span className="gradient-text">built.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={cardVariants}
              className="glass rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col"
            >
              {/* Banner */}
              <div className={`h-28 bg-gradient-to-br ${project.accent} flex items-center justify-center relative`}>
                <span className="text-4xl">{project.emoji}</span>
                {project.badge && (
                  <span className="absolute top-3 right-3 bg-white/20 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30">
                    {project.badge}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-bold text-slate-800">{project.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
                    GitHub ↗
                  </a>
                  <a href={project.live} className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
                    Live Demo ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

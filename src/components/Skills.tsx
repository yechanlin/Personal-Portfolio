"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    title: "Languages",
    dot: "bg-blue-600",
    bar: "from-blue-500 to-blue-700",
    skills: [
      { name: "Python", level: 88 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "C++", level: 68 },
      { name: "Java", level: 65 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    dot: "bg-sky-500",
    bar: "from-sky-400 to-blue-600",
    skills: [
      { name: "React.js", level: 85 },
      { name: "Node.js / Express", level: 80 },
      { name: "FastAPI / Django", level: 74 },
      { name: "MongoDB / PostgreSQL", level: 76 },
    ],
  },
  {
    title: "Cloud & Tools",
    dot: "bg-slate-600",
    bar: "from-slate-400 to-slate-700",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "AWS (EC2, S3, Bedrock)", level: 72 },
      { name: "Docker", level: 65 },
      { name: "Figma", level: 62 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section px-6 max-w-6xl mx-auto">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase">Skills</span>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-800 mb-10"
        >
          My{" "}
          <span className="gradient-text">toolkit.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.12 }}
              className="glass rounded-3xl p-6 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${cat.dot}`} />
                <h3 className="font-bold text-slate-700">{cat.title}</h3>
              </div>

              <div className="flex flex-col gap-4">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-600">{skill.name}</span>
                      <span className="text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: ci * 0.12 + si * 0.08 + 0.3, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${cat.bar}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

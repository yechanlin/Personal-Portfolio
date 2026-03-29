"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Boundary RSS",
    period: "Mar 2025 - May 2025",
    location: "Remote",
    bullets: [
      "Built a Python-based DEM extractor with OpenTopography API, reducing manual analysis time by 70%.",
      "Developed cloud-integrated ETL pipeline on AWS EC2, cutting data validation time by 40%.",
      "Achieved 100% unit test coverage and reduced post-deployment defects by 25%.",
    ],
    tags: ["Python", "AWS EC2", "ETL", "Agile"],
  },
  {
    role: "Software Engineer Intern",
    company: "CodeDay Labs",
    period: "Dec 2024 - Feb 2025",
    location: "Remote",
    bullets: [
      "Validated 25+ API endpoints with Mocha/Chai, reducing integration bugs by 30%.",
      "Contributed to a sustainability platform adopted by 200+ organizations.",
    ],
    tags: ["MochaJS", "ChaiJS", "Node.js", "APIs"],
  },
  {
    role: "Software Team Lead",
    company: "OC Robotic Club",
    period: "Oct 2024 - May 2025",
    location: "Costa Mesa, CA",
    bullets: [
      "Led software development for a Mars rover robotics project.",
      "Built simulation and control components for sensor-motor-software integration.",
    ],
    tags: ["Robotics", "C++", "Team Lead"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section px-6 max-w-6xl mx-auto">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase">Experience</span>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-800 mb-10"
        >
          Where I&apos;ve{" "}
          <span className="gradient-text">worked.</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[17px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative sm:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-[11px] top-7 w-3 h-3 rounded-full bg-blue-500 border-[3px] border-blue-100 hidden sm:block" />

                <div className="glass rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                      <p className="text-sm font-semibold text-blue-600">{exp.company}</p>
                    </div>
                    <div className="text-xs text-slate-400 sm:text-right">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-slate-500 leading-relaxed flex gap-2">
                        <span className="text-blue-400 mt-1 shrink-0">&#8226;</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-lg text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

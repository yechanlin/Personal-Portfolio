"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-4"
    >
      <nav
        className={`glass rounded-2xl px-6 py-3 flex items-center gap-8 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-blue-100/60" : ""
        }`}
      >
        <a href="#" className="text-blue-600 font-bold text-lg tracking-tight select-none">
          YL
        </a>

        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:yechanlin15703@gmail.com"
          className="hidden sm:block text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-xl transition-colors duration-200"
        >
          Hire Me
        </a>
      </nav>
    </motion.header>
  );
}

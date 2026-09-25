// Single source of truth for portfolio content. Edit this file to update the site.

export const profile = {
  name: "Ye Chan Lin",
  handle: "yechanlin",
  title: "Software Engineer",
  school: "UCLA · B.S. Computer Science",
  gradYear: "2027",
  gradDate: "Dec 2027",
  status: "Open to Summer 2027 internships & new-grad roles",
  tagline: "I build full-stack apps, AI agents, and fast data pipelines.",
  bio: [
    "CS student at UCLA who likes shipping things people actually use — from hackathon-winning AI agents to a Go telemetry pipeline pushing 55K events/sec.",
    "This summer I was a Meta × MLH Production Engineering Fellow, digging into Linux internals, CI/CD and observability. Before that I interned at Boundary RSS, shipped a merged fix to Open Energy Dashboard, and led software for a Mars rover team. Two-time hackathon winner (LA Hacks, BruinAI × AWS).",
  ],
  email: "yechanlin15703@gmail.com",
  github: "https://github.com/yechanlin",
  linkedin: "https://linkedin.com/in/yechanlin",
  resume: "/resume.pdf",
};

export const stats = [
  { label: "Hackathon wins", value: "2" },
  { label: "Eng. roles", value: "3" },
  { label: "Projects shipped", value: "7+" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
  active?: boolean;
  link?: string;
};

export const experiences: Experience[] = [
  {
    role: "Production Engineering Fellow",
    company: "Meta × MLH Fellowship",
    period: "Jun 2026 – Aug 2026",
    location: "Remote",
    bullets: [
      "Selected for the Meta × MLH Production Engineering Fellowship: 12 weeks of PE curriculum with mentorship from Meta engineers.",
      "Investigated Linux behavior under CPU saturation, memory pressure and resource contention with vmstat, sar, journalctl and /proc on CentOS.",
      "Shipped a containerized Flask + MySQL + NGINX app with GitHub Actions CI/CD and Prometheus/Grafana monitoring.",
    ],
    tags: ["Linux", "Docker", "NGINX", "GitHub Actions", "Grafana"],
  },
  {
    role: "Software Engineer Intern",
    company: "Boundary RSS",
    period: "Mar 2025 – May 2025",
    location: "Remote",
    bullets: [
      "Engineered a Python DEM extractor on the OpenTopography API, cutting manual analysis time by 70% across 10+ geospatial research workflows.",
      "Built an AWS EC2 ETL pipeline for large geospatial datasets with parallel processing and concurrent uploads, reducing validation time by 40%.",
      "Wrote unit and integration tests that caught geospatial edge cases pre-deploy, reducing post-release defects by 25%.",
    ],
    tags: ["Python", "AWS EC2", "ETL", "Testing"],
  },
  {
    role: "Open Source Contributor",
    company: "CodeDay Labs · Open Energy Dashboard",
    period: "Dec 2024 – Feb 2025",
    location: "Remote",
    bullets: [
      "Fixed a production unit-conversion bug causing inaccurate kWh-to-kg CO₂ numbers for 200+ organizations tracking sustainability metrics.",
      "Built a Mocha/Chai suite covering chained conversions and 15+ edge cases, taking previously failing cases to a 100% pass rate.",
      "Merged PR #1426 after iterating on maintainer review and passing CI.",
    ],
    tags: ["JavaScript", "Mocha", "Chai", "Open Source"],
    link: "https://github.com/OpenEnergyDashboard/OED/pull/1426",
  },
  {
    role: "Software Team Lead",
    company: "OC Robotics",
    period: "Oct 2024 – May 2025",
    location: "Costa Mesa, CA",
    bullets: [
      "Led software development for a Mars rover robotics project.",
      "Built simulation and control components for sensor–motor–software integration.",
    ],
    tags: ["C++", "Robotics", "Leadership"],
  },
];

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  award?: string;
  metric?: string;
  repo?: string;
  live?: string;
  color: string; // cartridge label color
};

export const projects: Project[] = [
  {
    title: "Talantis",
    blurb:
      "Talent-intelligence platform aggregating 64K+ internship placements across 63 companies and 31 universities, with six Postgres-backed agent tools streaming Claude answers over SSE.",
    tags: ["Next.js", "FastAPI", "Postgres", "Supabase", "Claude"],
    award: "LA Hacks 2026 Winner",
    repo: "https://github.com/Talantis/talantis",
    live: "https://talantis.vercel.app",
    color: "#ff6b5b",
  },
  {
    title: "ClubApply.ai",
    blurb:
      "AI club-application coach: six research and coaching stages turn club sources and your resume into tailored guidance, with automatic failover across three LLM providers.",
    tags: ["React", "FastAPI", "AWS Bedrock", "Lambda", "ECR"],
    award: "BruinAI × AWS Hackathon Winner",
    repo: "https://github.com/yechanlin/AWS-x-Bruin-AI",
    live: "https://clubapply.vercel.app",
    color: "#ffd166",
  },
  {
    title: "Chad the Interviewer",
    blurb:
      "Real-time voice mock interviews. Live Deepgram transcripts drive adaptive questions, and an async pipeline scores clarity, technical depth and response quality.",
    tags: ["React", "Node.js", "WebSockets", "Deepgram", "MongoDB"],
    metric: "Built at SB Hacks XII",
    repo: "https://github.com/yechanlin/SB-Hacks",
    live: "https://rehearse-wp4z.onrender.com",
    color: "#7ee0c3",
  },
  {
    title: "AV Telemetry Platform",
    blurb:
      "Replays KITTI self-driving GPS/IMU data through a from-scratch TCP pool and Redis RESP encoder into Redis Streams, Postgres and MinIO, with crash-safe replay on Kubernetes.",
    tags: ["Go", "Redis", "Postgres", "Kubernetes", "Grafana"],
    metric: "55K events/s · p99 < 2ms · 7× throughput",
    repo: "https://github.com/yechanlin/event-telemetry-pipeline",
    color: "#8ecae6",
  },
  {
    title: "EZTrack",
    blurb:
      "Multi-user expense tracker for iOS & Android. Balances are always derived from the ledger, so they can never drift.",
    tags: ["React Native", "Expo", "Django REST", "Supabase"],
    repo: "https://github.com/yechanlin/EZTrack",
    color: "#c3a6ff",
  },
  {
    title: "NEXUS",
    blurb:
      "Swipe-based platform for finding project collaborators, with real-time chat and JWT auth.",
    tags: ["React", "Express", "MongoDB", "Tailwind"],
    repo: "https://github.com/yechanlin/NEXUS",
    live: "https://nexus-collab.vercel.app",
    color: "#ff9f6b",
  },
  {
    title: "Resume Manager",
    blurb:
      "Graph-based resume workspace built on React Flow — organize CVs by role and generate tailored versions from a job description.",
    tags: ["React", "TypeScript", "Django", "OpenAI"],
    metric: "Built at USC AI Hackathon",
    repo: "https://github.com/yechanlin/RMS",
    color: "#9be07e",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Go", "TypeScript", "JavaScript", "Java", "C++", "SQL", "Bash"],
  },
  {
    group: "Frameworks & Data",
    items: ["React", "Next.js", "FastAPI", "Flask", "Node / Express", "Django", "PostgreSQL", "Redis", "MongoDB", "Supabase"],
  },
  {
    group: "Infra & DevOps",
    items: ["Linux", "AWS", "Docker", "Kubernetes", "NGINX", "GitHub Actions", "Prometheus", "Grafana", "MinIO", "Git"],
  },
];

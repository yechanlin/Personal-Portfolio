// Single source of truth for portfolio content. Edit this file to update the site.

export const profile = {
  name: "Ye Chan Lin",
  handle: "yechanlin",
  title: "Software Engineer",
  school: "UCLA · B.S. Computer Science",
  gradYear: "2027",
  status: "Open to 2027 internships & new-grad roles",
  tagline: "I build full-stack apps, AI agents, and fast data pipelines.",
  bio: [
    "CS student at UCLA who likes shipping things people actually use — from hackathon-winning AI agents to a Go telemetry pipeline pushing 55K events/sec.",
    "I've interned at Boundary RSS and CodeDay Labs, led software for a Mars rover team, and won at LA Hacks and the AWS × Bruin AI Hackathon. I care about clean, tested code and fast feedback loops.",
  ],
  email: "yechanlin15703@gmail.com",
  github: "https://github.com/yechanlin",
  linkedin: "https://linkedin.com/in/yechanlin",
  resume: "/resume.pdf",
};

export const stats = [
  { label: "Hackathon wins", value: "2" },
  { label: "Internships", value: "2" },
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
};

export const experiences: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Boundary RSS",
    period: "Mar 2025 – May 2025",
    location: "Remote",
    bullets: [
      "Built a Python DEM extractor on the OpenTopography API, cutting manual analysis time by 70%.",
      "Developed a cloud ETL pipeline on AWS EC2, reducing data validation time by 40%.",
      "Reached 100% unit test coverage and cut post-deployment defects by 25%.",
    ],
    tags: ["Python", "AWS EC2", "ETL"],
  },
  {
    role: "Software Engineer Intern",
    company: "CodeDay Labs",
    period: "Dec 2024 – Feb 2025",
    location: "Remote",
    bullets: [
      "Validated 25+ API endpoints with Mocha/Chai, reducing integration bugs by 30%.",
      "Contributed to a sustainability platform adopted by 200+ organizations.",
    ],
    tags: ["Node.js", "Mocha", "Chai", "APIs"],
  },
  {
    role: "Software Team Lead",
    company: "OC Robotics Club",
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
      "Talent-intelligence platform with an AI agent, Atlas, that maps 6,478 internship placements across 54 companies and 31 universities.",
    tags: ["Next.js", "FastAPI", "Claude", "Supabase", "Fetch.ai"],
    award: "LA Hacks 2026 Winner",
    repo: "https://github.com/Talantis/talantis",
    live: "https://talantis.vercel.app",
    color: "#ff6b5b",
  },
  {
    title: "ClubApply",
    blurb:
      "AI assistant for UCLA club applications — tailored interview prep and resume tips powered by multi-model agents on AWS Bedrock.",
    tags: ["React", "FastAPI", "AWS Lambda", "Bedrock"],
    award: "Best Use of AWS · AWS × Bruin AI",
    repo: "https://github.com/yechanlin/AWS-x-Bruin-AI",
    live: "https://clubapply.vercel.app",
    color: "#ffd166",
  },
  {
    title: "Rehearse",
    blurb:
      "Real-time voice mock interviews. An AI interviewer asks questions, hands you live coding problems, and gives a scored hiring verdict.",
    tags: ["React", "Deepgram", "OpenAI", "Express", "MongoDB"],
    metric: "Built at SB Hacks",
    repo: "https://github.com/yechanlin/SB-Hacks",
    live: "https://rehearse-wp4z.onrender.com",
    color: "#7ee0c3",
  },
  {
    title: "Event Telemetry Pipeline",
    blurb:
      "Ingests self-driving sensor streams through a hand-rolled TCP connection pool into Redis Streams, Postgres and MinIO, with zero loss on worker failure.",
    tags: ["Go", "Redis", "Postgres", "Kubernetes", "Grafana"],
    metric: "~55K events/s · p99 < 2ms",
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
    items: ["Python", "TypeScript", "JavaScript", "Go", "C++", "Java", "Swift", "SQL"],
  },
  {
    group: "Frameworks",
    items: ["React", "Next.js", "React Native", "Node / Express", "FastAPI", "Django", "Tailwind"],
  },
  {
    group: "Cloud & Infra",
    items: ["AWS", "Docker", "Kubernetes", "Redis", "Postgres", "MongoDB", "Supabase", "Git"],
  },
];

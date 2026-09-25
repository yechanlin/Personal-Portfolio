"use client";

import { useEffect, useRef } from "react";

// The scene is drawn on a low-resolution canvas and stretched with
// `image-rendering: pixelated`, so every shape snaps to a chunky pixel grid.
const PX = 6;

interface Puff {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  r: number;
  scattered: boolean;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  fade: number; // 0..1 fade-in after reforming
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
  width: number;
  shade: string;
  puffs: Puff[];
}

interface Star {
  x: number;
  y: number;
  phase: number;
  speed: number;
}

const SHADES = ["#3a3470", "#4a4288", "#5b529c"];

function createCloud(w: number, h: number, anywhere: boolean): Cloud {
  const width = 14 + Math.random() * 26;
  const count = Math.round(width / 3);
  const puffs: Puff[] = [];
  for (let i = 0; i < count; i++) {
    const px = (i / count - 0.5) * width;
    const py = (Math.random() - 0.3) * 4 - (1 - Math.abs(i / count - 0.5) * 2) * 3;
    puffs.push({
      x: px, y: py, baseX: px, baseY: py,
      r: 2 + Math.random() * 3,
      scattered: false, vx: 0, vy: 0, life: 0, maxLife: 0, fade: 1,
    });
  }
  return {
    x: anywhere ? Math.random() * (w + width * 2) - width : -width,
    y: 8 + Math.random() * (h - 16),
    speed: 0.02 + Math.random() * 0.05,
    width,
    shade: SHADES[Math.floor(Math.random() * SHADES.length)],
    puffs,
  };
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let clouds: Cloud[] = [];
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / PX);
      canvas.height = Math.ceil(window.innerHeight / PX);
      const n = Math.max(6, Math.round(canvas.width / 22));
      clouds = Array.from({ length: n }, () => createCloud(canvas.width, canvas.height, true));
      stars = Array.from({ length: Math.round((canvas.width * canvas.height) / 180) }, () => ({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.03,
      }));
    };
    resize();

    const handleClick = (e: MouseEvent) => {
      const mx = e.clientX / PX;
      const my = e.clientY / PX;
      const blast = 12;
      for (const c of clouds) {
        for (const p of c.puffs) {
          if (p.scattered) continue;
          const dx = c.x + p.x - mx;
          const dy = c.y + p.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < blast + p.r) {
            const force = ((blast - dist) / blast) * 1.2 + 0.4;
            const a = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.8;
            p.scattered = true;
            p.vx = Math.cos(a) * force;
            p.vy = Math.sin(a) * force - Math.random() * 0.3;
            p.life = 0;
            p.maxLife = 50 + Math.random() * 50;
          }
        }
      }
    };

    const draw = () => {
      const { width: w, height: h } = canvas;
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#121028");
      grad.addColorStop(1, "#1b1838");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.phase += s.speed;
        const on = Math.sin(s.phase) > 0.2;
        ctx.fillStyle = on ? "#f4ecd8" : "#6d6594";
        ctx.fillRect(s.x, s.y, 1, 1);
      }

      for (const c of clouds) {
        c.x += c.speed;
        if (c.x - c.width > w) Object.assign(c, createCloud(w, h, false));

        ctx.fillStyle = c.shade;
        for (const p of c.puffs) {
          let alpha = p.fade;
          if (p.scattered) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.01;
            p.life++;
            alpha = 1 - p.life / p.maxLife;
            if (p.life >= p.maxLife) {
              Object.assign(p, { scattered: false, x: p.baseX, y: p.baseY, vx: 0, vy: 0, fade: 0 });
              continue;
            }
          } else if (p.fade < 1) {
            p.fade = Math.min(1, p.fade + 0.02);
          }
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(Math.round(c.x + p.x), Math.round(c.y + p.y), p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    };

    let raf = 0;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && !reduced) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const handleVisibility = () => (document.hidden ? stop() : start());
    const handleResize = () => {
      resize();
      draw();
    };

    draw();
    start();
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    if (!reduced) window.addEventListener("click", handleClick);

    return () => {
      stop();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pixelated fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}

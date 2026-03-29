"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  alpha: number;
  scattered: boolean;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  fadingIn: boolean;
  fadeProgress: number;
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
  particles: Particle[];
  width: number;
  height: number;
}

// Pre-render a soft circle sprite (radial gradient) — replaces expensive ctx.filter blur
const spriteCache = new Map<number, HTMLCanvasElement>();
function getSoftCircle(radius: number): HTMLCanvasElement {
  const key = Math.round(radius);
  if (spriteCache.has(key)) return spriteCache.get(key)!;
  const size = key * 3; // extra room for soft edge
  const c = document.createElement("canvas");
  c.width = size * 2;
  c.height = size * 2;
  const cx = c.getContext("2d")!;
  const grad = cx.createRadialGradient(size, size, 0, size, size, size);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.8)");
  grad.addColorStop(0.7, "rgba(255,255,255,0.3)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  cx.fillStyle = grad;
  cx.fillRect(0, 0, size * 2, size * 2);
  spriteCache.set(key, c);
  return c;
}

function createCloudParticles(w: number, h: number, count: number, alphaMin: number, alphaRange: number, rMin: number, rRange: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const rx = (Math.random() * 0.45 + 0.1) * w;
    const ry = (Math.random() * 0.4 + 0.1) * h;
    const px = Math.cos(angle) * rx;
    const py = Math.sin(angle) * ry * 0.5;
    particles.push({
      x: px, y: py, baseX: px, baseY: py,
      radius: Math.random() * rRange + rMin,
      alpha: Math.random() * alphaRange + alphaMin,
      scattered: false, vx: 0, vy: 0,
      life: 0, maxLife: 0, fadingIn: false, fadeProgress: 1,
    });
  }
  return particles;
}

function createCloud(canvasW: number, canvasH: number): Cloud {
  const rand = Math.random();
  let w: number, h: number, count: number, aMin: number, aRange: number, rMin: number, rRange: number, speed: number;

  if (rand < 0.3) { // large
    w = Math.random() * 100 + 200; h = Math.random() * 40 + 70;
    count = 65; aMin = 0.5; aRange = 0.35; rMin = 16; rRange = 24;
    speed = Math.random() * 0.12 + 0.06;
  } else if (rand < 0.65) { // medium
    w = Math.random() * 80 + 120; h = Math.random() * 25 + 45;
    count = 45; aMin = 0.4; aRange = 0.3; rMin = 12; rRange = 18;
    speed = Math.random() * 0.18 + 0.1;
  } else { // small
    w = Math.random() * 50 + 60; h = Math.random() * 15 + 25;
    count = 25; aMin = 0.3; aRange = 0.25; rMin = 8; rRange = 12;
    speed = Math.random() * 0.25 + 0.12;
  }

  return {
    x: Math.random() * (canvasW + w * 2) - w,
    y: Math.random() * canvasH * 0.92 + canvasH * 0.03,
    speed,
    particles: createCloudParticles(w, h, count, aMin, aRange, rMin, rRange),
    width: w, height: h,
  };
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cloudsRef.current = Array.from({ length: 18 }, () =>
        createCloud(canvas.width, canvas.height)
      );
    };
    resize();
    window.addEventListener("resize", resize);

    const handleClick = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;
      const blastRadius = 80;

      for (const cloud of cloudsRef.current) {
        for (const p of cloud.particles) {
          if (p.scattered) continue;
          const dx = cloud.x + p.x - mx;
          const dy = cloud.y + p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < blastRadius + p.radius) {
            p.scattered = true;
            const force = ((blastRadius - dist) / blastRadius) * 7 + 2;
            const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.8;
            p.vx = Math.cos(angle) * force;
            p.vy = Math.sin(angle) * force - Math.random() * 1.5;
            p.life = 0;
            p.maxLife = Math.random() * 90 + 60;
          }
        }
      }
    };
    window.addEventListener("click", handleClick);

    // Pre-render background gradient
    const bgCanvas = document.createElement("canvas");
    const drawBg = () => {
      bgCanvas.width = canvas.width;
      bgCanvas.height = canvas.height;
      const bgCtx = bgCanvas.getContext("2d")!;
      const grad = bgCtx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#eef2ff");
      grad.addColorStop(0.5, "#f8fafc");
      grad.addColorStop(1, "#ffffff");
      bgCtx.fillStyle = grad;
      bgCtx.fillRect(0, 0, canvas.width, canvas.height);
      // Ambient blobs baked in
      bgCtx.filter = "blur(80px)";
      bgCtx.globalAlpha = 0.08;
      bgCtx.beginPath();
      bgCtx.arc(canvas.width * 0.15, canvas.height * 0.2, 300, 0, Math.PI * 2);
      bgCtx.fillStyle = "#3b82f6";
      bgCtx.fill();
      bgCtx.beginPath();
      bgCtx.arc(canvas.width * 0.85, canvas.height * 0.5, 250, 0, Math.PI * 2);
      bgCtx.fillStyle = "#38bdf8";
      bgCtx.fill();
      bgCtx.filter = "none";
    };
    drawBg();
    window.addEventListener("resize", drawBg);

    let raf: number;
    const draw = () => {
      // Stamp pre-rendered background (no blur per frame)
      ctx.drawImage(bgCanvas, 0, 0);

      for (const cloud of cloudsRef.current) {
        cloud.x += cloud.speed;
        if (cloud.x > canvas.width + cloud.width * 2) {
          cloud.x = -cloud.width * 2.5;
        }

        for (const p of cloud.particles) {
          let drawX: number, drawY: number, drawAlpha: number, drawRadius: number;

          if (p.scattered) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03;
            p.vx *= 0.99;
            p.vy *= 0.99;
            p.life++;
            const lifeRatio = p.life / p.maxLife;
            drawX = cloud.x + p.x;
            drawY = cloud.y + p.y;
            drawAlpha = p.alpha * (1 - lifeRatio);
            drawRadius = p.radius * (1 - lifeRatio * 0.5);

            if (p.life >= p.maxLife) {
              p.scattered = false;
              p.x = p.baseX; p.y = p.baseY;
              p.vx = 0; p.vy = 0;
              p.fadingIn = true; p.fadeProgress = 0;
              continue;
            }
          } else {
            if (p.fadingIn) {
              p.fadeProgress += 0.012;
              if (p.fadeProgress >= 1) { p.fadeProgress = 1; p.fadingIn = false; }
            }
            drawX = cloud.x + p.x;
            drawY = cloud.y + p.y;
            drawAlpha = p.alpha * p.fadeProgress;
            drawRadius = p.radius;
          }

          if (drawAlpha < 0.01) continue;

          // Draw using pre-rendered sprite — no blur per frame
          const sprite = getSoftCircle(drawRadius);
          const s = Math.round(drawRadius) * 3;
          ctx.globalAlpha = drawAlpha;
          ctx.drawImage(sprite, drawX - s, drawY - s, s * 2, s * 2);
        }
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", drawBg);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}

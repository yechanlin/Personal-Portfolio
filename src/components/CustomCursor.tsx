"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const smoothMouse = useRef({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [pressing, setPressing] = useState(false);
  const trail = useRef<{ x: number; y: number; alpha: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      trail.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trail.current.length > 12) trail.current.shift();
    };
    const handleDown = () => setPressing(true);
    const handleUp = () => setPressing(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp smooth position
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.25;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.25;

      if (!visible) { raf = requestAnimationFrame(draw); return; }

      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;
      const size = pressing ? 6 : 10;
      const lineLen = pressing ? 5 : 8;
      const gap = pressing ? 3 : 5;

      // Trail
      for (let i = 0; i < trail.current.length; i++) {
        const t = trail.current[i];
        t.alpha -= 0.06;
        if (t.alpha > 0) {
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 99, 235, ${t.alpha * 0.25})`;
          ctx.fill();
        }
      }
      trail.current = trail.current.filter((t) => t.alpha > 0);

      // Crosshair lines
      ctx.strokeStyle = "rgba(37, 99, 235, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      // Top
      ctx.beginPath();
      ctx.moveTo(mx, my - gap);
      ctx.lineTo(mx, my - gap - lineLen);
      ctx.stroke();
      // Bottom
      ctx.beginPath();
      ctx.moveTo(mx, my + gap);
      ctx.lineTo(mx, my + gap + lineLen);
      ctx.stroke();
      // Left
      ctx.beginPath();
      ctx.moveTo(mx - gap, my);
      ctx.lineTo(mx - gap - lineLen, my);
      ctx.stroke();
      // Right
      ctx.beginPath();
      ctx.moveTo(mx + gap, my);
      ctx.lineTo(mx + gap + lineLen, my);
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(mx, my, pressing ? 2 : 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(37, 99, 235, 0.9)";
      ctx.fill();

      // Outer ring (subtle)
      ctx.beginPath();
      ctx.arc(mx, my, size + 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(37, 99, 235, ${pressing ? 0.15 : 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible, pressing]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}

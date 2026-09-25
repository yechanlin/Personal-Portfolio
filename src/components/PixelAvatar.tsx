"use client";

import { useEffect, useRef, useState } from "react";

// Renders the headshot as a 48×48 pixel sprite; hovering reveals the real photo.
export default function PixelAvatar({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const ctx = canvas.getContext("2d")!;
      const side = Math.min(img.width, img.height);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, (img.width - side) / 2, 0, side, side, 0, 0, canvas.width, canvas.height);
      // Posterize to a limited palette for a sprite feel
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const step = 48;
      for (let i = 0; i < data.data.length; i += 4) {
        for (let c = 0; c < 3; c++) data.data[i + c] = Math.round(data.data[i + c] / step) * step;
      }
      ctx.putImageData(data, 0, 0);
    };
  }, [src]);

  return (
    <button
      type="button"
      className="relative block aspect-square w-full max-w-[240px] cursor-pointer bg-edge"
      onMouseEnter={() => setReveal(true)}
      onMouseLeave={() => setReveal(false)}
      onClick={() => setReveal((r) => !r)}
      aria-label={reveal ? "Show pixel avatar" : "Show photo"}
    >
      <canvas ref={canvasRef} width={48} height={48} className="pixelated h-full w-full" />
      {/* eslint-disable-next-line @next/next/no-img-element -- plain swap image, sized by container */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 ${
          reveal ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}

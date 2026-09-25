# yechanlin.vercel.app

Personal portfolio of Ye Chan Lin — a pixel-art, retro-game themed site built with Next.js 16, Tailwind CSS 4 and Framer Motion.

## Updating content

All text, projects, experience and skills live in [`src/data/profile.ts`](src/data/profile.ts). Edit that file; the components read from it.

Put your resume at `public/resume.pdf`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Design notes

- Palette and pixel primitives (`.px-box`, `.px-btn`, `.px-link`) are in `src/app/globals.css`.
- Fonts: Pixelify Sans (display) + Geist Mono (body), via `next/font/google`.
- The sky is drawn on a low-res canvas scaled up with `image-rendering: pixelated` (`AnimatedBackground.tsx`). Click to scatter clouds.
- The boot screen plays once per session and is skipped for `prefers-reduced-motion`.

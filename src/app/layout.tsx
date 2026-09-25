import type { Metadata, Viewport } from "next";
import { Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixel = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yechanlin.vercel.app"),
  title: "Ye Chan Lin — Software Engineer",
  description:
    "UCLA CS '27. Full-stack apps, AI agents and data pipelines. LA Hacks 2026 winner.",
  openGraph: {
    title: "Ye Chan Lin — Software Engineer",
    description: "UCLA CS '27. Full-stack apps, AI agents and data pipelines.",
    url: "https://yechanlin.vercel.app",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1b1838",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixel.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

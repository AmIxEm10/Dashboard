import type { Metadata } from "next";
import { Fraunces, Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const italicFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-italic",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alex Dupont — Développeur Full Stack",
    template: "%s · Alex Dupont",
  },
  description:
    "Portfolio d'Alex Dupont, développeur full stack basé à Paris. Produits web, design system, architectures type-safe.",
  keywords: [
    "développeur",
    "full stack",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "Alex Dupont" }],
  openGraph: {
    title: "Alex Dupont — Développeur Full Stack",
    description: "Portfolio, projets et notes d'un dev basé à Paris.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${italicFont.variable} ${mono.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import SceneCanvas from "@/components/three/SceneCanvas";
import Navbar from "@/components/ui/Navbar";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CGR International — Precision Engineering",
    template: "%s · CGR International",
  },
  description:
    "CGR International — leader mondial de l'ingénierie, de la fabrication de ressorts, du formage à froid et des composants mécaniques de précision.",
  keywords: [
    "CGR International",
    "ressorts",
    "formage à froid",
    "composants mécaniques",
    "automobile",
    "aéronautique",
    "précision",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${mono.variable}`}>
      <body>
        <LenisProvider>
          {/* Global WebGL canvas stays mounted across route changes. */}
          <SceneCanvas />
          <Navbar />
          <main className="relative z-10">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}

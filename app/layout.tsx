import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import SceneCanvas from "@/components/three/SceneCanvas";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Preloader from "@/components/ui/Preloader";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://www.cgr-international.com";
const OG_IMAGE = "/og/cgr-form-your-world.jpg";
const OG_DESCRIPTION =
  "CGR International — Form your world. Leader mondial de l'ingénierie des ressorts, du formage à froid et des composants mécaniques de précision. 15 sites, 4 continents. IATF 16949 · EN 9100 · ISO 13485 · ISO 9001.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "CGR International | Form your world. — Ressorts & formage à froid",
    template: "%s · CGR International",
  },
  description: OG_DESCRIPTION,
  applicationName: "CGR International",
  generator: "Next.js",
  keywords: [
    "CGR International",
    "Form your world",
    "ressorts industriels",
    "spring manufacturer",
    "formage à froid",
    "cold forming",
    "composants mécaniques de précision",
    "pièces automobiles",
    "IATF 16949",
    "aéronautique",
    "EN 9100",
    "médical",
    "ISO 13485",
    "ISO 9001",
    "ISO 14001",
    "B2B industriel",
    "fabricant de ressorts",
    "usinage précision",
  ],
  authors: [{ name: "CGR International", url: SITE_URL }],
  creator: "CGR International",
  publisher: "CGR International",
  category: "manufacturing",
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: "CGR International",
    title: "CGR International | Form your world.",
    description: OG_DESCRIPTION,
    url: SITE_URL,
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CGR International — Form your world.",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CGR International | Form your world.",
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2250",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <LenisProvider>
          {/* Global WebGL canvas stays mounted across route changes. */}
          <SceneCanvas />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          {/* Mechanical shutter preloader — sits above everything until
              the loading manager reports ready + min dwell has elapsed. */}
          <Preloader />
        </LenisProvider>
      </body>
    </html>
  );
}

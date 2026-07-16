import type { Metadata } from "next";
import { IBM_Plex_Sans_Condensed, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const plexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-plex-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Afsaneh Alavi Naeeni — AI Automation Specialist",
  description:
    "Precision-driven AI automation consulting for small and medium businesses — from workflow design to full implementation, in both English and Persian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plexCondensed.variable} ${sourceSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-cream text-text-dark">
        {children}
      </body>
    </html>
  );
}

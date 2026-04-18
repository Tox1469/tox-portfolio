import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/contexts/LangContext";
import LangToggle from "./components/LangToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tox — Full-Stack Developer & Security Engineer",
  description:
    "7 years building SaaS platforms, AI agents, and real-time systems from scratch. Security consulting for banks and enterprises.",
  keywords: [
    "full-stack developer",
    "security engineer",
    "SaaS",
    "AI agents",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "Tox" }],
  openGraph: {
    title: "Tox — Full-Stack Developer & Security Engineer",
    description:
      "7 years building production systems. Security consulting for Sicredi, self-checkout for Tozetto, and more.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tox — Full-Stack Developer & Security Engineer",
    description:
      "7 years building production systems. Security consulting for banks and enterprises.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%2322c55e'>%3E_</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LangProvider>
          <LangToggle />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keraunos Labs | From Idea to Scalable Technology",
  description: "We build high-performance websites, dApps, and software for ambitious brands. Web Design, E-Commerce, Smart Contracts, and more.",
  keywords: ["web development", "dApps", "smart contracts", "e-commerce", "Next.js", "Solidity"],
  authors: [{ name: "Keraunos Labs" }],
  openGraph: {
    title: "Keraunos Labs | From Idea to Scalable Technology",
    description: "We build high-performance websites, dApps, and software for ambitious brands.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keraunos Labs | From Idea to Scalable Technology",
    description: "We build high-performance websites, dApps, and software for ambitious brands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#0a0a0a] text-[#e5e5e5]`}
      >
        {/* Animated Grid Background */}
        <div className="grid-background" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

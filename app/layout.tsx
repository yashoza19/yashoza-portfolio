import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yashoza-portfolio.vercel.app'),
  title: {
    default: "Yash Oza | Full Stack Developer",
    template: "%s | Yash Oza"
  },
  description: "Portfolio of Yash Oza - Full Stack Developer crafting exceptional web experiences with React, Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "Yash Oza",
    "full stack developer",
    "web developer",
    "react developer",
    "nextjs developer",
    "typescript",
    "portfolio",
    "software engineer",
    "frontend developer",
    "backend developer",
  ],
  authors: [{ name: "Yash Oza", url: "https://yashoza-portfolio.vercel.app" }],
  creator: "Yash Oza",
  publisher: "Yash Oza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashoza-portfolio.vercel.app",
    title: "Yash Oza | Full Stack Developer",
    description: "Portfolio of Yash Oza - Full Stack Developer crafting exceptional web experiences with React, Next.js, TypeScript, and modern web technologies.",
    siteName: "Yash Oza Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Oza | Full Stack Developer",
    description: "Portfolio of Yash Oza - Full Stack Developer crafting exceptional web experiences",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

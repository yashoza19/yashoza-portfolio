import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    default: "Yash Oza | Senior DevOps & Software Engineer",
    template: "%s | Yash Oza"
  },
  description: "Portfolio of Yash Oza — Senior DevOps Engineer building scalable Kubernetes infrastructure, CI/CD systems, and cloud-native platforms at Red Hat.",
  keywords: [
    "Yash Oza",
    "devops engineer",
    "software engineer",
    "kubernetes",
    "openshift",
    "aws",
    "infrastructure as code",
    "ci/cd",
    "terraform",
    "docker",
    "ansible",
    "portfolio",
  ],
  authors: [{ name: "Yash Oza", url: "https://yashoza-portfolio.vercel.app" }],
  creator: "Yash Oza",
  publisher: "Yash Oza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashoza-portfolio.vercel.app",
    title: "Yash Oza | Senior DevOps & Software Engineer",
    description: "Portfolio of Yash Oza — Senior DevOps Engineer building scalable Kubernetes infrastructure, CI/CD systems, and cloud-native platforms at Red Hat.",
    siteName: "Yash Oza Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Oza | Senior DevOps & Software Engineer",
    description: "Portfolio of Yash Oza — DevOps & Software Engineer",
    creator: "@yashdoza",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

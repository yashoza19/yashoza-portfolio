import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  title: "Yash Oza | Full Stack Developer",
  description: "Portfolio of Yash Oza - Full Stack Developer crafting exceptional web experiences",
  keywords: ["web developer", "full stack", "react", "nextjs", "portfolio"],
  authors: [{ name: "Yash Oza" }],
  openGraph: {
    title: "Yash Oza | Full Stack Developer",
    description: "Portfolio of Yash Oza - Full Stack Developer crafting exceptional web experiences",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}

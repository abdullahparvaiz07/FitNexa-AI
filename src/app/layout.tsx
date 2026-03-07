import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitNexa AI - Train Smarter",
  description: "AI-Powered Fitness Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={spaceGrotesk.className}>
        <Providers>
          <div className="relative z-10 flex h-auto min-h-screen w-full flex-col group/design-root">
            <div className="layout-container flex h-full grow flex-col">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Celio Vieira - Profile",
  description: "About myself and my experiences",
  applicationName: "My Profile",
  keywords: ["celio", "vieira", "profile", "about", "me"],
  category: "blog",
  classification: "free",
  creator: "Celio Vieira",
  authors: [{ name: "Celio Vieira", url: "celiovieira.com" }],
  publisher: "Vercel",
  generator: "Next.js",
  icons: {
    icon: "./icon.svg",
    shortcut: "./icon.svg",
    apple: "./icon.svg",
    href: ".icon.svg",
  },
};

interface Props {
  children: ReactNode;
  params: { lang: string };
}

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

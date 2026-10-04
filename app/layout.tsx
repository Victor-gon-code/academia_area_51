import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap"
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Academia Área 51 | Camocim de São Félix",
  description:
    "Academia Área 51 em Camocim de São Félix. Estrutura, rotina e identidade para quem leva o treino a sério.",
  applicationName: "Academia Área 51",
  authors: [{ name: "Academia Área 51" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Academia Área 51",
    description: "A cidade ainda dorme. A Área 51 já está em movimento.",
    type: "website",
    locale: "pt_BR"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050706"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}

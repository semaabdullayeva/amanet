import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amanet | Rəqəmsal Həllər və İnnovativ Texnologiyalar",
  description:
    "Amanet ilə biznesinizi rəqəmsal dünyaya daşıyın. Veb tətbiqlər, mobil tətbiqlər, cloud həllər, kiber təhlükəsizlik və IT konsultasiya xidmətləri.",
  keywords: [
    "amanet",
    "veb tətbiq",
    "mobil tətbiq",
    "cloud",
    "kiber təhlükəsizlik",
    "it konsultasiya",
    "azərbaycan",
    "rəqəmsal həllər",
  ],
  openGraph: {
    title: "Amanet | Rəqəmsal Həllər və İnnovativ Texnologiyalar",
    description:
      "Amanet ilə biznesinizi rəqəmsal dünyaya daşıyın. Müasir həllər, innovativ yanaşma və peşəkar komanda.",
    type: "website",
    locale: "az_AZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
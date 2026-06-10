import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ellia Foundation — Together In Service, Building Together",
  description:
    "Ellia Foundation is a voluntary humanitarian organization established in 2015 and officially registered with the Directorate of NGOs in the Kurdistan Region of Iraq. The organization works to raise public awareness through volunteer initiatives in the fields of environmental protection, human rights, and community development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}


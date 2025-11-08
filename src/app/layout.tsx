import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const generalSans = localFont({
  src: [
    {
      path: "../../public/assets/fonts/GeneralSans-Variable.ttf",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/GeneralSans-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Balance Conference 2026",
  description: "The premier conference for visionaries seeking harmony between innovation and wellbeing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${generalSans.variable} ${cormorantGaramond.variable}`}>
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

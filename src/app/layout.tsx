import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bodoni_Moda } from "next/font/google";
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

const bodoniModa = Bodoni_Moda({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Balance Conference 2026",
  description: "Join a community redefining what it means to live well, inside and out. Reconnect with yourself, others, and what truly matters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${generalSans.variable} ${bodoniModa.variable} overflow-x-hidden`}>
      <body className="font-sans overflow-x-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "প্রয়োজনীয় পণ্যের বাজারদর এক নজরে জানুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="min-h-screen bg-[#f6faf7] text-slate-900">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
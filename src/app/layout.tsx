import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import DisableNumberScroll from "@/components/DisableNumberScroll";
import { Outfit, JetBrains_Mono } from "next/font/google";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Travel Management System",
  description: "Secure travel management platform with fleet management, trip tracking, booking, expenses, and daily reporting.",
};

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} min-h-screen bg-page text-text-primary`}>
        <AuthProvider>
          <DisableNumberScroll />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

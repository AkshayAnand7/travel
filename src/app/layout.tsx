import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import DisableNumberScroll from "@/components/DisableNumberScroll";
import { Inter, JetBrains_Mono } from "next/font/google";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "RK Travel Hub — RK Enterprise",
  description: "Professional travel agency, vehicle fleet, trip management, payments, and financial reporting system.",
};

const inter = Inter({ 
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-page text-text-primary antialiased selection:bg-primary/10 selection:text-primary`}>
        <AuthProvider>
          <DisableNumberScroll />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

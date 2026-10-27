"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-blue-600/10 selection:text-blue-600">
      {/* Dynamic Ambient Background Glows for Glassmorphism */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top-right subtle blue gradient orb */}
        <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] bg-gradient-to-br from-blue-400/12 via-indigo-400/8 to-transparent rounded-full blur-3xl" />
        {/* Top-left subtle violet glow */}
        <div className="absolute top-48 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-purple-400/10 via-sky-300/8 to-transparent rounded-full blur-3xl" />
        {/* Bottom subtle emerald/teal glow */}
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-emerald-400/10 via-teal-300/6 to-transparent rounded-full blur-3xl" />
        {/* Delicate subtle micro grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f018_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f018_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main content area */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          collapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"
        }`}
      >
        <Topbar onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)} />
        <main className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-68px)] max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

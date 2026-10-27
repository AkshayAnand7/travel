"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Bus,
  Car,
  Wallet,
  BookOpen,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/travel", icon: LayoutDashboard },
  { name: "Trips", href: "/travel/trips", icon: Bus },
  { name: "Vehicles", href: "/travel/vehicles", icon: Car },
  { name: "Payments", href: "/travel/payments", icon: Wallet },
  { name: "Cash Book", href: "/travel/cashbook", icon: BookOpen },
  { name: "Reports", href: "/travel/reports", icon: BarChart3 },
  { name: "Reminders", href: "/travel/reminders", icon: Bell },
  { name: "Settings", href: "/travel/settings", icon: Settings },
];

export default function Sidebar({ collapsed, mobileOpen, onToggleCollapse, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/travel") return pathname === "/travel";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen flex flex-col
          bg-sidebar text-white transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "lg:w-[76px]" : "lg:w-[270px]"}
          w-[270px]
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 px-5 h-[76px] shrink-0 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
            <Bus className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold tracking-wide leading-tight">TRAVEL HUB</h1>
              <p className="text-[10px] text-blue-300/70 font-medium tracking-widest">RK ENTERPRISE</p>
            </div>
          )}
          {/* Mobile close */}
          <button
            onClick={onCloseMobile}
            className="ml-auto p-1.5 rounded-lg hover:bg-white/10 lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-blue-300/40 uppercase tracking-widest px-3 mb-3">
              Main Menu
            </p>
          )}
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                title={collapsed ? item.name : undefined}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group relative
                  ${active
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`} />
                {!collapsed && <span>{item.name}</span>}
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <span className="absolute left-full ml-3 px-2.5 py-1 bg-sidebar-secondary text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center h-10 mx-3 mb-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Decorative brand text */}
        {!collapsed && (
          <div className="px-5 pb-6 border-t border-white/5 pt-4">
            <p className="font-[var(--font-cursive)] text-2xl text-blue-400/30 leading-tight">
              Travel<br />Beyond<br />Borders
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

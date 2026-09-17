"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LogOut, Bus, Fuel, Calendar
} from "lucide-react";
import { signOut } from "next-auth/react";

interface StaffLayoutProps {
  children: React.ReactNode;
  shopName?: string;
}

export default function StaffLayout({ children, shopName }: StaffLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Trips", href: `/travel/trips`, icon: Bus },
    { name: "Booking", href: `/travel/booking`, icon: Calendar },
    { name: "Expenses", href: `/travel/expenses`, icon: Fuel },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 h-14 bg-surface border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm border border-slate-700">
            <Bus className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-text-primary leading-none">
              Travel
            </h1>
            {shopName && <p className="text-[10px] text-text-muted mt-0.5">{shopName}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })} 
            className="p-2 text-text-muted hover:text-danger cursor-pointer transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border flex items-center justify-around px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))', height: 'calc(4rem + env(safe-area-inset-bottom, 0px))' }}>
        {navItems.map(item => (
          <Link 
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all duration-150 ${
              isActive(item.href) ? "text-primary" : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive(item.href) ? "animate-slide-up" : ""}`} />
            <span className="text-[10px] font-bold tracking-tight uppercase">{item.name}</span>
            {isActive(item.href) && <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
          </Link>
        ))}
      </nav>
    </div>
  );
}

import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  subtitle?: string;
  trend?: { value: string; positive: boolean };
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  subtitle,
  trend,
}: StatCardProps) {
  return (
    <div className="card group relative flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1 truncate">
            {label}
          </p>
          <p className="text-[22px] font-bold text-text-primary font-mono-nums tracking-tight leading-snug truncate">
            {value}
          </p>
        </div>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/80 shadow-xs backdrop-blur-xs transition-transform duration-200 group-hover:scale-105 ${iconBg}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-xs gap-2">
          {subtitle && (
            <span className="text-[11px] text-text-muted truncate leading-tight">
              {subtitle}
            </span>
          )}
          {trend && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold shrink-0 px-1.5 py-0.5 rounded ${
                trend.positive
                  ? "text-emerald-700 bg-emerald-50 border border-emerald-200/60"
                  : "text-rose-700 bg-rose-50 border border-rose-200/60"
              }`}
            >
              {trend.positive ? (
                <TrendingUp className="w-3 h-3 text-emerald-600" />
              ) : (
                <TrendingDown className="w-3 h-3 text-rose-600" />
              )}
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

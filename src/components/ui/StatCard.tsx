import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  subtitle?: string;
  trend?: { value: string; positive: boolean };
}

export default function StatCard({ label, value, icon: Icon, iconColor, iconBg, subtitle, trend }: StatCardProps) {
  return (
    <div className="card flex items-start justify-between gap-3 hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-text-secondary mb-1">{label}</p>
        <p className="text-2xl font-bold text-text-primary font-mono-nums leading-tight truncate">{value}</p>
        {subtitle && <p className="text-xs text-text-muted mt-1.5">{subtitle}</p>}
        {trend && (
          <p className={`text-xs font-semibold mt-1.5 ${trend.positive ? "text-success" : "text-danger"}`}>
            {trend.value}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </div>
  );
}

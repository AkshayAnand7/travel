"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, IndianRupee, Bus, Fuel, 
  Wallet, ArrowUpRight, ArrowDownRight, Plus, 
  Car, Calendar, Clock, ChevronRight, Activity,
  CheckCircle2, AlertCircle
} from "lucide-react";
import type { AnalyticsData } from "./actions";

export default function AnalyticsDashboardClient({ data }: { data: AnalyticsData }) {
  const [activeTab, setActiveTab] = useState<"overview" | "trips" | "expenses">("overview");

  const profitPositive = data.netProfit >= 0;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase rounded-full border border-emerald-500/30">
              Live Operations
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Fleet Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Real-time revenue, trips, expenses & profit metrics
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/travel/trips"
            className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs sm:text-sm transition-all active:scale-[0.98] shadow-lg shadow-emerald-600/30"
          >
            <Plus className="w-4 h-4" /> New Trip
          </Link>
          <Link
            href="/travel/expenses"
            className="flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-xs sm:text-sm transition-all active:scale-[0.98] border border-slate-700"
          >
            <Fuel className="w-4 h-4 text-amber-400" /> Add Expense
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-surface p-5 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-text-primary font-mono-nums">
            ₹{data.totalRevenue.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] font-bold">
            <span className="text-emerald-600">₹{data.totalReceived.toLocaleString()} recvd</span>
            {data.totalPending > 0 && (
              <span className="text-amber-600">• ₹{data.totalPending.toLocaleString()} due</span>
            )}
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-surface p-5 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Total Expenses</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <Fuel className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 font-mono-nums">
            ₹{data.totalExpenses.toLocaleString()}
          </div>
          <p className="mt-2 text-[11px] font-bold text-text-muted">
            Across {data.expenseCount} recorded bills
          </p>
        </div>

        {/* Net Profit */}
        <div className="bg-surface p-5 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Net Profit</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${profitPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
              {profitPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            </div>
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-mono-nums ${profitPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            ₹{data.netProfit.toLocaleString()}
          </div>
          <p className="mt-2 text-[11px] font-bold text-text-muted">
            Revenue minus operating expenses
          </p>
        </div>

        {/* Total Trips */}
        <div className="bg-surface p-5 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Total Trips</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-text-primary font-mono-nums">
            {data.tripCount}
          </div>
          <p className="mt-2 text-[11px] font-bold text-text-muted">
            {data.vehicleMetrics.length} active fleet vehicles
          </p>
        </div>
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Performance Breakdown */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
                <Car className="w-4 h-4 text-emerald-600" /> Vehicle Performance Leaderboard
              </h2>
              <p className="text-xs text-text-muted mt-0.5">Revenue generated and costs per vehicle</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-page px-2.5 py-1 rounded-full border border-border text-text-muted">
              {data.vehicleMetrics.length} Vehicles
            </span>
          </div>

          <div className="space-y-3">
            {data.vehicleMetrics.map((v, i) => {
              const profit = v.revenue - v.expenses;
              return (
                <div
                  key={v.vehicle || i}
                  className="p-4 rounded-2xl bg-page border border-border hover:border-emerald-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center font-black text-xs text-text-primary shadow-sm">
                      #{i + 1}
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-text-primary uppercase tracking-tight">
                        {v.vehicle || "Unassigned"}
                      </h3>
                      <p className="text-[11px] font-bold text-text-muted mt-0.5">
                        {v.trips} Trips Completed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-muted block">Revenue</span>
                      <span className="text-xs font-black text-emerald-600 font-mono-nums">
                        ₹{v.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-muted block">Expenses</span>
                      <span className="text-xs font-black text-rose-500 font-mono-nums">
                        ₹{v.expenses.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-muted block">Net Yield</span>
                      <span className={`text-xs font-black font-mono-nums ${profit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        ₹{profit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {data.vehicleMetrics.length === 0 && (
              <div className="py-12 text-center text-text-muted text-xs italic">
                No vehicle trip or expense data recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Expense Category Breakdown */}
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-5">
          <div>
            <h2 className="text-base font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
              <Wallet className="w-4 h-4 text-amber-500" /> Expense Breakdown
            </h2>
            <p className="text-xs text-text-muted mt-0.5">Distribution across cost categories</p>
          </div>

          <div className="space-y-4">
            {data.categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-text-primary">{cat.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-[11px] font-mono-nums">{cat.percentage}%</span>
                    <span className="font-mono-nums text-text-primary font-black">₹{cat.amount.toLocaleString()}</span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-page rounded-full overflow-hidden border border-border/50">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${Math.max(5, cat.percentage)}%` }}
                  />
                </div>
              </div>
            ))}

            {data.categoryBreakdown.length === 0 && (
              <div className="py-12 text-center text-text-muted text-xs italic">
                No expense category records available.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Sections (Side by Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trips */}
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
              <Bus className="w-4 h-4 text-emerald-600" /> Recent Trips
            </h2>
            <Link
              href="/travel/trips"
              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {data.recentTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-3.5 rounded-2xl bg-page border border-border flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-text-primary uppercase">
                      {trip.from_location} → {trip.to_location}
                    </span>
                    <span className="px-2 py-0.5 bg-surface text-text-muted text-[9px] font-black rounded-full border border-border uppercase">
                      {trip.vehicle}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-0.5 font-medium">
                    {new Date(trip.date).toLocaleDateString()} {trip.customer_name ? `• ${trip.customer_name}` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-black text-emerald-600 font-mono-nums block">
                    ₹{(trip.total_amount || trip.received_amount || 0).toLocaleString()}
                  </span>
                  <span className="text-[9px] font-bold text-text-muted uppercase">
                    {trip.trip_type || 'Trip'}
                  </span>
                </div>
              </div>
            ))}

            {data.recentTrips.length === 0 && (
              <div className="py-8 text-center text-text-muted text-xs italic">
                No recent trips found.
              </div>
            )}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
              <Fuel className="w-4 h-4 text-rose-500" /> Recent Expenses
            </h2>
            <Link
              href="/travel/expenses"
              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {data.recentExpenses.map((exp) => (
              <div
                key={exp.id}
                className="p-3.5 rounded-2xl bg-page border border-border flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-text-primary uppercase">
                      {exp.category}
                    </span>
                    <span className="px-2 py-0.5 bg-surface text-text-muted text-[9px] font-black rounded-full border border-border uppercase">
                      {exp.vehicle}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-0.5 font-medium">
                    {new Date(exp.date).toLocaleDateString()} {exp.description ? `• ${exp.description}` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-black text-rose-500 font-mono-nums block">
                    ₹{Number(exp.amount).toLocaleString()}
                  </span>
                  <span className="text-[9px] font-bold text-text-muted uppercase">
                    Billed
                  </span>
                </div>
              </div>
            ))}

            {data.recentExpenses.length === 0 && (
              <div className="py-8 text-center text-text-muted text-xs italic">
                No recent expenses found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

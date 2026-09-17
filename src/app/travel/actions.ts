'use server'

import { createAdminClient } from '@/lib/supabase'

export interface AnalyticsData {
  totalRevenue: number
  totalReceived: number
  totalPending: number
  totalExpenses: number
  netProfit: number
  tripCount: number
  expenseCount: number
  categoryBreakdown: { category: string; amount: number; percentage: number; color: string }[]
  vehicleMetrics: { vehicle: string; trips: number; revenue: number; expenses: number }[]
  recentTrips: any[]
  recentExpenses: any[]
  monthlyTrend: { month: string; revenue: number; expenses: number; profit: number }[]
}

export async function getTravelAnalytics(): Promise<AnalyticsData> {
  const supabase = createAdminClient()

  try {
    const [tripsRes, expensesRes] = await Promise.all([
      supabase.from('trips').select('*').order('date', { ascending: false }),
      supabase.from('expenses').select('*').order('date', { ascending: false }),
    ])

    const trips = tripsRes.data || []
    const expenses = expensesRes.data || []

    let totalRevenue = 0
    let totalReceived = 0
    let totalExpenses = 0

    // Vehicle aggregations
    const vehicleMap: Record<string, { trips: number; revenue: number; expenses: number }> = {}

    // Monthly trend aggregations
    const monthMap: Record<string, { revenue: number; expenses: number }> = {}

    // Process Trips
    trips.forEach((t) => {
      const rev = Number(t.total_amount) || Number(t.received_amount) || 0
      const rec = Number(t.received_amount) || 0
      totalRevenue += rev
      totalReceived += rec

      const vName = (t.vehicle || 'Unassigned').trim().toUpperCase()
      if (!vehicleMap[vName]) {
        vehicleMap[vName] = { trips: 0, revenue: 0, expenses: 0 }
      }
      vehicleMap[vName].trips += 1
      vehicleMap[vName].revenue += rev

      if (t.date) {
        const d = new Date(t.date)
        const monthKey = d.toLocaleString('default', { month: 'short', year: '2-digit' })
        if (!monthMap[monthKey]) monthMap[monthKey] = { revenue: 0, expenses: 0 }
        monthMap[monthKey].revenue += rev
      }
    })

    // Category aggregations
    const categoryMap: Record<string, number> = {}

    // Process Expenses
    expenses.forEach((e) => {
      const amt = Number(e.amount) || 0
      totalExpenses += amt

      const cat = (e.category || 'other').trim().toLowerCase()
      categoryMap[cat] = (categoryMap[cat] || 0) + amt

      const vName = (e.vehicle || 'Unassigned').trim().toUpperCase()
      if (!vehicleMap[vName]) {
        vehicleMap[vName] = { trips: 0, revenue: 0, expenses: 0 }
      }
      vehicleMap[vName].expenses += amt

      if (e.date) {
        const d = new Date(e.date)
        const monthKey = d.toLocaleString('default', { month: 'short', year: '2-digit' })
        if (!monthMap[monthKey]) monthMap[monthKey] = { revenue: 0, expenses: 0 }
        monthMap[monthKey].expenses += amt
      }
    })

    const netProfit = totalRevenue - totalExpenses
    const totalPending = Math.max(0, totalRevenue - totalReceived)

    // Format category breakdown
    const categoryColors: Record<string, string> = {
      fuel: 'bg-amber-500',
      maintenance: 'bg-blue-500',
      'driver salary': 'bg-purple-500',
      other: 'bg-slate-500',
    }

    const categoryBreakdown = Object.entries(categoryMap).map(([category, amount]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      amount,
      percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
      color: categoryColors[category] || 'bg-emerald-500',
    }))

    // Format vehicle metrics
    const vehicleMetrics = Object.entries(vehicleMap)
      .map(([vehicle, data]) => ({
        vehicle,
        trips: data.trips,
        revenue: data.revenue,
        expenses: data.expenses,
      }))
      .sort((a, b) => b.revenue - a.revenue)

    // Format monthly trend
    const monthlyTrend = Object.entries(monthMap).map(([month, data]) => ({
      month,
      revenue: data.revenue,
      expenses: data.expenses,
      profit: data.revenue - data.expenses,
    }))

    return {
      totalRevenue,
      totalReceived,
      totalPending,
      totalExpenses,
      netProfit,
      tripCount: trips.length,
      expenseCount: expenses.length,
      categoryBreakdown,
      vehicleMetrics,
      recentTrips: trips.slice(0, 5),
      recentExpenses: expenses.slice(0, 5),
      monthlyTrend,
    }
  } catch (err) {
    console.error('Error computing travel analytics:', err)
    return {
      totalRevenue: 0,
      totalReceived: 0,
      totalPending: 0,
      totalExpenses: 0,
      netProfit: 0,
      tripCount: 0,
      expenseCount: 0,
      categoryBreakdown: [],
      vehicleMetrics: [],
      recentTrips: [],
      recentExpenses: [],
      monthlyTrend: [],
    }
  }
}

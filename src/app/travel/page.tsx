import StaffLayout from "@/components/StaffLayout";
import { getTravelAnalytics } from "./actions";
import AnalyticsDashboardClient from "./analytics-dashboard-client";

export const dynamic = 'force-dynamic';

export default async function TravelDashboardPage() {
  const analyticsData = await getTravelAnalytics();

  return (
    <StaffLayout shopName="Analytics Overview">
      <AnalyticsDashboardClient data={analyticsData} />
    </StaffLayout>
  );
}

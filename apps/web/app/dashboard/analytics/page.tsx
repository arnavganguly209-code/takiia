import { SetupState } from "@/components/dashboard/SetupState";

export default function DashboardAnalyticsPage() {
  return (
    <SetupState
      title="Analytics"
      body="No live charts are shown here. Social and Google Ads metrics wait on connected provider APIs. This page will not invent customer numbers."
    />
  );
}

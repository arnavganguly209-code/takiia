import { SetupState } from "@/components/dashboard/SetupState";

export default function DashboardAdsPage() {
  return (
    <SetupState
      title="Google Ads"
      body="No Google Ads account is connected. Campaign lists, budgets, and metrics stay empty until a developer token, OAuth client, customer permission, and tested API operations exist. Ad spend is billed by Google, not by Takiia."
    />
  );
}

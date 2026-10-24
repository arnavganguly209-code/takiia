import { SetupState } from "@/components/dashboard/SetupState";

export default function DashboardSettingsPage() {
  return (
    <SetupState
      title="Settings"
      body="Profile and workspace settings use the existing session. Integration tokens stay server-side. Disconnect and audit actions will appear here as each provider is configured."
      href="/dashboard"
    />
  );
}

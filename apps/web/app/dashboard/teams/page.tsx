import { SetupState } from "@/components/dashboard/SetupState";

export default function DashboardTeamsPage() {
  return (
    <SetupState
      title="Teams"
      body="Workspace membership and roles are enforced by the API. Invite flows appear after you are signed into a workspace. Task boards are not part of the current product."
      href="/dashboard"
    />
  );
}

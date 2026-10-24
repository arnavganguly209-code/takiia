import { SetupState } from "@/components/dashboard/SetupState";

export default function DashboardFilesPage() {
  return (
    <SetupState
      title="Files"
      body="Attachments are available on authorized conversations. There is no separate public file drive. Downloads stay membership-checked."
      href="/dashboard/inbox"
    />
  );
}

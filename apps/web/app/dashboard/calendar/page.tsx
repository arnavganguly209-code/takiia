import { SetupState } from "@/components/dashboard/SetupState";

export default function DashboardCalendarPage() {
  return (
    <SetupState
      title="Calendar"
      body="Meeting records can be created in the Meetings area. External calendar sync is not configured. This view will list authorized workspace events after they exist."
      href="/dashboard/meetings"
    />
  );
}

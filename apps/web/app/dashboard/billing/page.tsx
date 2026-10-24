import { SetupState } from "@/components/dashboard/SetupState";

export default function DashboardBillingPage() {
  return (
    <SetupState
      title="Billing"
      body="Plan records and quotas exist in the database. Checkout, invoices, and webhooks stay off until a payment provider that can settle for this business is configured. Payment success is never faked."
      href="/billing"
    />
  );
}

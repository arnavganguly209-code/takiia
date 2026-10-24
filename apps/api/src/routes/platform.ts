import { Router } from "express";
import { featureFlagsFromEnv, type ApiEnv } from "../env.js";

export function platformRouter(env: ApiEnv) {
  const router = Router();

  router.get("/platform", (_req, res) => {
    const flags = featureFlagsFromEnv(env);
    res.json({
      service: "takiia-api",
      runtime: "node",
      services: [
        {
          id: "messaging",
          name: "Messaging",
          state: "records",
          note: "Direct and group conversations, history, and attachments are served by this API."
        },
        {
          id: "meetings",
          name: "Meetings",
          state: flags.webrtcCalls || flags.livekitMeetings ? "media" : "records",
          note: "Meeting records exist. Live audio and video stay off until TURN or LiveKit is verified."
        },
        {
          id: "social",
          name: "Social",
          state: flags.socialPublish ? "credentials" : "off",
          note: "Facebook, Instagram, and TikTok publishing waits on official OAuth credentials."
        },
        {
          id: "ads",
          name: "Google Ads",
          state: flags.googleAds ? "credentials" : "off",
          note: "Campaign reads and edits wait on the official Google Ads API. Ad spend is billed by Google."
        },
        {
          id: "billing",
          name: "Billing",
          state: flags.payments ? "credentials" : "off",
          note: "Plan quotas exist. Checkout stays off until a payment provider is configured."
        }
      ]
    });
  });

  return router;
}

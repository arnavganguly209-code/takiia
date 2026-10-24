import { Router } from "express";
import { featureFlagsFromEnv, type ApiEnv } from "../env.js";

export function adsRouter(env: ApiEnv) {
  const router = Router();

  router.get("/ads/status", (_req, res) => {
    const configured = featureFlagsFromEnv(env).googleAds;
    res.json({
      provider: "google-ads",
      configured,
      campaigns: [],
      spendIncludedInSubscription: false,
      note: configured
        ? "Credentials are present. Campaign operations stay disabled until each Google Ads API call is implemented and tested."
        : "Google Ads is not configured. A developer token, OAuth client, and customer permission are required."
    });
  });

  return router;
}

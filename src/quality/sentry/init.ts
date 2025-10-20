/* sentry is not mandatory to run the app */

import * as Sentry from "@sentry/react";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || "";
const isSentryEnabled = Boolean(SENTRY_DSN);

if (isSentryEnabled) {
  Sentry.init({
    dsn: "https://pocket@pbt@mock/699",
    tunnel: "https://pocket-pbt.netlify.app/.netlify/functions/sentry-tunnel",
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^\//],
    sendDefaultPii: true,
  });
  console.info("✅ Sentry initialized");
} else {
  console.warn("⚠️ Sentry DSN not set — running without error tracking");
}

export { Sentry };

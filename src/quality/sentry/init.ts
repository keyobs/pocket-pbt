/* sentry is not mandatory to run the app */

import * as Sentry from "@sentry/react";

// Only used locally for debugging (fake or optional DSN)
const LOCAL_SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || "";

const isLocal = import.meta.env.DEV;
const tunnelUrl = isLocal
  ? "http://localhost:8888/.netlify/functions/sentry-tunnel"
  : "https://pocket-pbt.netlify.app/.netlify/functions/sentry-tunnel";

const isSentryEnabled = isLocal ? Boolean(LOCAL_SENTRY_DSN) : true;

if (isSentryEnabled) {
  Sentry.init({
    dsn: "https://example@fake/0",
    tunnel: tunnelUrl,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^\//],
    sendDefaultPii: true,
  });
  console.info("✅ Sentry initialized" + (isLocal ? " (local mode)" : ""));
} else {
  console.warn("⚠️ Sentry DSN not set — running without error tracking");
}

export { Sentry };

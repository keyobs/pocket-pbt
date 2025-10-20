import type {
  Handler,
  HandlerEvent,
  HandlerResponse,
} from "@netlify/functions";

export const handler: Handler = async (
  event: HandlerEvent
): Promise<HandlerResponse> => {
  const SENTRY_DSN = process.env.SENTRY_DSN;
  if (!SENTRY_DSN) return { statusCode: 200 };

  const url = SENTRY_DSN.replace(
    /^https:\/\/[^@]+@([^/]+)\/(\d+)$/,
    "https://$1/api/$2/envelope/"
  );

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-sentry-envelope" },
      body: event.body,
    });
    return { statusCode: resp.status };
  } catch (err) {
    console.error("Sentry tunnel error:", err);
    return { statusCode: 500 };
  }
};

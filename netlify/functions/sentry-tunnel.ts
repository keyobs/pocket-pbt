import type {
  Handler,
  HandlerEvent,
  HandlerResponse,
} from "@netlify/functions";

export const handler: Handler = async (
  event: HandlerEvent
): Promise<HandlerResponse> => {
  const SENTRY_DSN = process.env.SENTRY_DSN;
  if (!SENTRY_DSN) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

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

    return {
      statusCode: resp.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    console.error("Sentry tunnel error:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};

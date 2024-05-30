import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../trpc/router";

export const trpc = createReactQueryHooks<AppRouter>();

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // In the browser, we return a relative URL
    return "";
  }
  // When rendering on the server, we return an absolute URL
  // Note: Make sure to set the NEXT_PUBLIC_VERCEL_URL environment variable when deploying
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpcClientOptions = {
  url: `${getBaseUrl()}/api/trpc`,
};

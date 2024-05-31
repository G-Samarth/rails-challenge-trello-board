import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../trpc/router";

export const trpc = createReactQueryHooks<AppRouter>();

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  // When rendering on the server, we return an absolute URL (Set VERCEL_URL)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpcClientOptions = {
  url: `${getBaseUrl()}/api/trpc`,
};

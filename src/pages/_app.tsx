import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../trpc/router";
import { trpcClientOptions } from "../utils/trpc";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return trpcClientOptions;
  },
  ssr: true,
})(MyApp);

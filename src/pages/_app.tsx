import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
}

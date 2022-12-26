import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PodcastContext from "../components/PodcastContext";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PodcastContext>
        <Navbar />
        <Component {...pageProps} />
      </PodcastContext>
    </QueryClientProvider>
  );
}

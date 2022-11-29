import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PodcastContext from "../components/PodcastContext";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PodcastContext>
        <div className="w-full bg-secondary p-4 flex items-center gap-x-2">
          <Link
            href="/"
            className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            PODCAST
          </Link>
          <span className="text-xs text-text">
            Developed by <span className="">Swoxy</span>
          </span>
        </div>
        <Component {...pageProps} />
      </PodcastContext>
    </QueryClientProvider>
  );
}

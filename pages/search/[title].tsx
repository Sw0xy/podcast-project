import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import PodcastCard from "../../components/PodcastCard";
import { Feed } from "../../types";
export default function PodcastPage() {
  const router = useRouter();
  const { title } = router.query;
  const {
    isLoading,
    isError,
    data: podcasts,
    refetch,
  } = useQuery(
    [title],
    async () => {
      try {
        const { data } = await axios({
          url: `/api/search`,
          params: {
            q: title,
            mode: "text",
          },
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
    {
      enabled: true,
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    }
  );

  return (
    <div className="w-full h-full">
      <h1 className="text-center text-text font-semibold text-2xl">
        Results for <span className="text-light_text">{title}</span>
      </h1>
      <div className="w-full h-full flex flex-wrap justify-center gap-3">
        {isLoading && <Loading />}
        {isError && <Error refetch={refetch} />}
        {podcasts?.feeds.map((item: Feed, index: number) => (
          <PodcastCard key={index} data={item} />
        ))}
        {podcasts?.feeds.length === 0 && (
          <h1 className="text-red-400 text-2xl font-medium mt-6">
            {podcasts.description}
          </h1>
        )}
      </div>
    </div>
  );
}

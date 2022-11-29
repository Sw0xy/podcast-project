import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import PodcastCard from "../../components/PodcastCard";
import { Feed } from "../../types";
import { TailSpin } from "react-loader-spinner";
import Error from "../../components/Error";

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const {
    isLoading,
    isError,
    data: podcasts,
    refetch,
  } = useQuery(
    [tag],
    async () => {
      try {
        const { data } = await axios({
          url: "/api/search?mode=tag&tag=" + tag!,
          params: { limit: 50 },
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
    <div className="w-full h-full p-2 md:p-4">
      <h1 className="text-text text-2xl font-semibold text-center">{tag}</h1>
      <div className="w-full h-full flex flex-wrap justify-center gap-2">
        {isLoading && (
          <div>
            <TailSpin
              height="42"
              width="42"
              color="#D2D3E0"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <h1 className="text-text text-sm">Loading...</h1>
          </div>
        )}
        {isError && <Error refetch={refetch} />}
        {podcasts?.feeds.map((item: Feed, index: number) => (
          <PodcastCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

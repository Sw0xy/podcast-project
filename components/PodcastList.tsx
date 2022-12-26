import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Feed } from "../types";
import Loading from "./Loading";
import PodcastCard from "./PodcastCard";
type Props = {
  title: string;
};
const PodcastList = ({ title }: Props) => {
  const {
    isLoading,
    isError,
    data: podcasts,
    refetch,
  } = useQuery(
    [title],
    async () => {
      try {
        let { data } = await axios({
          url: "/api/search?mode=tag&tag=" + title.toLowerCase(),
          params: { limit: 21 },
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
    {
      keepPreviousData: true,
      enabled: true,
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    }
  );
  /*   */
  return (
    <div className="w-full my-4 container mx-auto">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl my-3 text-light_text font-semibold">
          {title}
        </h1>
        <Link href={"tag/" + title}>
          {" "}
          <span className="text-text hover:underline font-medium">
            See more
          </span>
        </Link>
      </div>
      <div className="w-full  sm:grid sm:grid-flow-row flex flex-wrap sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5 justify-center md:justify-start px-2 md:px-0">
        {isLoading && <Loading />}
        {isError && (
          <button
            className="py-1 px-4 w-28 mx-auto rounded bg-bg hover:bg-hover ring-2 my-5 ring-border text-text"
            onClick={() => refetch()}
          >
            Retry
          </button>
        )}
        {podcasts?.feeds.map((item: Feed, index: number) => (
          <PodcastCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default PodcastList;

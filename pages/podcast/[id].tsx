/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { TbExternalLink } from "react-icons/tb";
import moment from "moment";
import { FaPlay } from "react-icons/fa";
import { usePlayer } from "../../components/PodcastContext";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

export default function PodcastPage() {
  const router = useRouter();
  const { id } = router.query;
  const max = 18;
  const { isLoading, isError, data, refetch } = useQuery(
    [id],
    async () => {
      try {
        let { data } = await axios({
          url: "/api/search?mode=id",
          params: { q: id },
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
  const {
    isLoading: episodeIsLoading,
    isError: episodeIsError,
    data: episodes,
    refetch: episodesRefetch,
  } = useQuery(
    [id + "episode"],
    async () => {
      try {
        const { data } = await axios({
          url: `/api/podcast/${id}/episodes`,
          params: {
            max: max,
            podcastId: id,
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
  const { playEpisode } = usePlayer();
  return (
    <div className="w-full h-full bg-bg">
      <div className="bg-gradient-to-b from-border to-transparent w-full flex items-center px-5">
        <div className="flex flex-col md:flex-row gap-y-4 items-center mx-auto h-full mt-10">
          {isLoading && <Loading />}
          {isError && <Error refetch={refetch} />}
          {data?.feed && (
            <img
              src={data?.feed.image}
              alt="image"
              className="max-w-[280px] max-h-[280px] aspect-square rounded-md drop-shadow-lg shadow-lg"
            />
          )}
          {data?.feed && (
            <div className="flex flex-col gap-y-2 ml-2 md:ml-10 ">
              <div>
                <span className="text-text text-sm font-semibold uppercase bg-bg rounded border border-border p-1">
                  {data?.feed.language}
                </span>
                <span className="text-text font-medium ml-4">
                  {data?.feed.episodeCount} Episode
                </span>
              </div>
              <h1 className="text-light_text text-3xl font-extrabold">
                {data?.feed.title}
              </h1>
              <span className="text-light_text font-medium">
                {data?.feed.ownerName}
              </span>
              <p className="text-text text-base max-w-[610px]">
                {data?.feed.description}
              </p>
              <p className="flex flex-wrap gap-2">
                {data?.feed.categories &&
                  Object.values(data?.feed.categories).map((category, i) => (
                    <Link href={`/tag/${category}`} key={i}>
                      <span className="rounded-xl bg-bg px-2 py-1 text-xs text-text border border-border hover:text-light_text">
                        {category as string}
                      </span>
                    </Link>
                  ))}
              </p>
              <Link href={`${data?.feed.link}`}>
                <div className=" mt-2 w-max flex items-center gap-x-2 bg-bg border border-border py-1 px-2 text-sm text-text rounded-md hover:bg-hover font-medium">
                  <TbExternalLink size={16} />
                  <span className="whitespace-nowrap"> Original Url</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="container flex flex-wrap justify-center gap-5 mx-auto max-w-7xl mt-10 mb-[120px]">
        {episodeIsLoading && <Loading />}
        {episodeIsError && <Error refetch={episodesRefetch} />}
        {episodes?.items.map((item: any, i: number) => {
          const min = moment.unix(item.duration).utc().format("H:m");
          return (
            <div
              key={i}
              onClick={() => playEpisode(item)}
              className="group hover:cursor-pointer flex flex-col gap-y-4 md:flex-row items-start md:items-center bg-secondary rounded-md border border-border max-w-sm w-full p-4 hover:bg-hover"
            >
              <div className="relative min-w-fit ">
                <div className="bg-black/70 rounded w-full h-full absolute top-1/2 left-1/2 z-10 -translate-x-1/2 hidden text-white -translate-y-1/2 group-hover:drop-shadow-lg group-hover:shadow-xl group-focus-within:block group-hover:flex group-hover:items-center">
                  <FaPlay size={24} className="m-auto" />
                </div>
                <img
                  src={item.feedImage}
                  alt="feedImage"
                  className="max-w-[350px] max-h-[350px] md:w-28 md:h-28 rounded"
                />
              </div>
              <div className="md:ml-2">
                <h1 className="text-light_text font-medium text-sm">
                  {item.title.slice(0, 70)}
                  {item.title.length >= 60 ? "..." : " "}
                </h1>
                <p
                  className="text-xs text-text"
                  dangerouslySetInnerHTML={{
                    __html: `${item.description.slice(0, 60) + "..."}`,
                  }}
                ></p>
                <span className="text-text text-sm font-medium">{min} min</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

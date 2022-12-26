/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Feed } from "../types";

const PodcastCard = ({ data }: { data: Feed }) => {
  return (
    <Link href={`/podcast/${data.id}`}>
      <div className="mx-auto w-max flex flex-col max-h-max sm:w-full sm:h-max p-1 sm:p-1 bg-secondary rounded-md hover:bg-hover transition-all hover:ring-[1px] hover:ring-border mt-5 sm:mt-0">
        {data.image && (
          <img
            src={data.image}
            alt="image"
            className="w-[130px] sm:w-full h-full aspect-square rounded-md"
          />
        )}
        <h3 className="text-light_text font-medium truncate p-2 text-sm w-[120px] sm:w-[180px]">
          {data.title}
        </h3>
      </div>
    </Link>
  );
};
export default PodcastCard;

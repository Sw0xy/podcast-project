/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Feed } from "../types";

const PodcastCard = ({ data }: { data: Feed }) => {
  return (
    <Link href={`/podcast/${data.id}`}>
      <div className="w-full h-max md:max-h-[230px] md:w-[180px] p-2 bg-secondary rounded-md hover:bg-hover transition-all hover:ring-[1px] hover:ring-border">
        {data.image && (
          <img
            src={data.image}
            alt="image"
            className="w-[300px] h-[300px] md:w-[180px] md:max-h-[180px] aspect-square rounded-md"
          />
        )}
        <h3 className="text-light_text font-medium truncate p-2 text-sm">
          {data.title}
        </h3>
      </div>
    </Link>
  );
};
export default PodcastCard;

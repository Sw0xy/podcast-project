import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FormEvent, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
type Props = {};

const Sidebar = (props: Props) => {
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    router.push("search/" + searchVal);
  }

  const {
    isLoading,
    isError,
    data: categories,
    refetch,
  } = useQuery(
    ["categories"],
    async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: "/api/categories",
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
    <div className="w-full md:w-max h-full sticky left-0 top-0 bottom-0 bg-bg ">
      <form
        onSubmit={handleSearch}
        className="w-full flex items-center justify-center flex-col border-r px-3 border-border"
      >
        <input
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search..."
          className="text-text max-w-xs w-full px-4 py-2 text-sm bg-secondary border border-border rounded-lg outline-none mt-5"
        />
        <div className="w-[200px]  flex-col pr-5 gap-y-2 mt-5 overflow-y-auto h-[calc(100vh)] hidden md:flex">
          {isLoading && <Loading />}
          {isError && <Error refetch={refetch} />}
          {categories?.feeds.map((item: { id: number; name: string }) => (
            <Link
              href={`search/${item.name}`}
              key={item.id}
              className=" hover:bg-hover whitespace-nowrap px-2 py-1 border border-border rounded-full text-text text-sm w-full"
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Sidebar;

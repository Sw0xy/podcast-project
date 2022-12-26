import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FormEvent, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
type Props = {};

const Navbar = (props: Props) => {
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    router.push("/search/" + searchVal);
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
    <div className="w-full bg-secondary p-2">
      <form
        onSubmit={handleSearch}
        className="w-full max-w-5xl flex items-center justify-between mx-auto flex-row md:px-3 "
      >
        <Link href="/">
          <h1 className="text-white text-lg md:text-2xl font-bold">PODY</h1>
        </Link>
        <input
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search..."
          className="text-text w-[180px] md:max-w-xs md:w-full px-4 py-2 text-sm bg-secondary border border-border rounded-lg outline-none"
        />
        {/* <div className="w-full flex-col pr-5 gap-y-2 mt-5 overflow-y-auto hidden md:flex">
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
        </div> */}
      </form>
    </div>
  );
};

export default Navbar;

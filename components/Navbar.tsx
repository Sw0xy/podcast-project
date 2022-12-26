import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FormEvent, useState } from "react";
type Props = {};

const Navbar = (props: Props) => {
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    router.push("/search/" + searchVal);
  }

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
      </form>
    </div>
  );
};

export default Navbar;

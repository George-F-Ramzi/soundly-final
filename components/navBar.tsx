"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export default function NavBar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useRouter();
  return (
    <nav className="text-white items-center flex justify-between">
      <h1 className="text-base mr-8 font-bold">Soundly</h1>
      <form
        onSubmit={() => navigate.push(`/search/${searchValue}`)}
        className="relative  hover:border-active rounded-full border-default border w-full h-9"
      >
        <input
          required
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          placeholder="Search"
          className="w-full peer text-para pl-10  valid:text-white  h-full rounded-full bg-transparent"
        />
        <RiSearchLine
          height={16}
          width={16}
          className="absolute text-para peer-focus:text-white h-4 w-4 top-[9px] left-[12px]"
        />
      </form>
      <Image
        className="rounded-full cursor-pointer ml-8"
        height={36}
        width={36}
        alt="profile image"
        src={"/profile-pic.png"}
      />
    </nav>
  );
}

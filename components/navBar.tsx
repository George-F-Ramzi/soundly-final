"use client";

import TokenContext from "@/utils/tokenContext";
import { IArtist, ITokenContext } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export default function NavBar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useRouter();
  const [Data, setData] = useState<IArtist>();
  const { token, setShow, setMe }: ITokenContext = useContext(TokenContext);

  useEffect(() => {
    if (!token && token === "") return;
    const api = async () => {
      let Res = await fetch("http://localhost:3000/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token!,
        },
      });
      if (!Res.ok) throw Error;

      let data: IArtist = await Res.json();
      setMe && setMe(data);
      setData(data);
    };
    api();
  }, [token, setMe]);

  return (
    <nav className="text-white items-center flex justify-between">
      <h1 className="text-base mr-4 sm:mr-8 font-bold">Soundly</h1>
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
      {!token && !Data ? (
        <button
          onClick={() => setShow && setShow(true)}
          className="bg-button ml-4 sm:ml-8 rounded-full h-9 text-black px-6 text-sm text-center font-bold"
        >
          Join
        </button>
      ) : (
        <Image
          className="rounded-full border border-default cursor-pointer ml-4 sm:ml-8"
          height={36}
          width={36}
          alt="profile image"
          src={Data?.cover!}
        />
      )}
    </nav>
  );
}

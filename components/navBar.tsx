"use client";

import TokenContext from "@/utils/tokenContext";
import { IArtist, ITokenContext } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import MenuSlideout from "./Slideouts/menuSlideout";
import Link from "next/link";

export default function NavBar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useRouter();
  const [Data, setData] = useState<IArtist>();
  const { token, setShow, setMe }: ITokenContext = useContext(TokenContext);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (!token) return;
    const api = async () => {
      let Res = await fetch("https://soundly-peach.vercel.app/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    <nav className='text-white items-center flex justify-between'>
      <Link
        href='/'
        className='text-base block mr-4 sm:mr-8 font-bold'
      >
        Soundly
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate.push(`/search/${searchValue}`);
        }}
        className='relative  hover:border-active rounded-full border-default border w-full h-9'
      >
        <input
          required
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          placeholder='Search'
          className='w-full peer text-para pl-10  valid:text-white  h-full rounded-full bg-transparent'
        />
        <RiSearchLine
          height={16}
          width={16}
          className='absolute text-para peer-focus:text-white h-4 w-4 top-[9px] left-[12px]'
        />
      </form>
      {!Data ? (
        <button
          onClick={() => setShow && setShow(true)}
          className='bg-button ml-4 sm:ml-8 rounded-full h-9 text-black px-6 text-sm text-center font-bold'
        >
          Join
        </button>
      ) : (
        <Image
          onClick={() => setToggle(true)}
          className='rounded-full border min-w-[36px] h-9 border-default cursor-pointer ml-4 sm:ml-8'
          height={36}
          width={36}
          alt='profile image'
          src={Data?.cover!}
        />
      )}
      {toggle ? (
        <MenuSlideout
          id={String(Data?.id!)}
          toggle={setToggle}
        />
      ) : (
        ""
      )}
    </nav>
  );
}

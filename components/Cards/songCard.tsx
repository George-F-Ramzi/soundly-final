"use client";

import PlayerContext from "@/utils/playerContext";
import { IContextPlayer, ISong } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export default function SongCard({ data }: { data: ISong }) {
  const { setSong }: IContextPlayer = useContext(PlayerContext);
  return (
    <div className='max-w-[206px] h-fit'>
      <Image
        role='songCard__cover'
        onClick={() => setSong && setSong(data)}
        alt='Song Cover'
        height={146}
        width={144}
        src={data.cover}
        className='w-full cursor-pointer object-cover rounded-lg mb-[19px] h-[146px]'
      />
      <div>
        <Link
          role='songCard__name'
          href={`/song/${data.id}`}
          className='text-2xl sm:text-xl leading-[200%] sm:leading-normal block font-bold text-center text-white'
        >
          {data.name}
        </Link>
        <Link
          role='songCard__username'
          href={`artist/${data.artist}`}
          className='text-xl sm:text-xs leading-[240%] sm:leading-normal  block font-medium text-center text-para'
        >
          {data.username}
        </Link>
      </div>
    </div>
  );
}

"use client";

import PlayerContext from "@/utils/playerContext";
import { IContextPlayer, ISong } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export default function SongCard({ data }: { data: ISong }) {
  const { setSong }: IContextPlayer = useContext(PlayerContext);
  return (
    <div className="max-w-[206px] h-fit">
      <Image
        onClick={() => setSong && setSong(data)}
        alt="Song Cover"
        height={146}
        width={144}
        src={data.cover}
        className="w-full cursor-pointer object-cover rounded-lg mb-[19px] h-[146px]"
      />
      <div>
        <Link
          href={`song/${data.id}`}
          className="text-xl block font-bold text-center text-white"
        >
          {data.name}
        </Link>
        <Link
          href={`artist/${data.artist}`}
          className="text-xs block font-medium text-center text-para"
        >
          {data.username}
        </Link>
      </div>
    </div>
  );
}

import { ISong } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SongCard({ data }: { data: ISong }) {
  return (
    <div className="w-full h-fit">
      <Image
        alt="Song Cover"
        height={146}
        width={144}
        src={data.cover}
        className="w-full object-cover rounded-lg mb-[19px] h-[146px]"
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

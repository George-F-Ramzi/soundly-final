import { IArtist } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ArtistCard({ data }: { data: IArtist }) {
  return (
    <div className="w-full flex flex-col items-center h-fit">
      <Image
        alt="Artist Cover"
        height={146}
        width={144}
        src={data.cover}
        className="max-w-[146px] object-cover rounded-full mb-[19px] h-[146px]"
      />
      <div>
        <Link
          href={`artist/${data.id}`}
          className="text-xl block font-bold text-center text-white"
        >
          {data.name}
        </Link>
        <p className="text-xs  font-medium text-center text-para">
          {data.followers}: followers
        </p>
      </div>
    </div>
  );
}

import { IComment } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CommentCard({ data }: { data: IComment }) {
  return (
    <div className="max-w-[372px] mb-[15px] flex">
      <Link
        className="bloc"
        href={`/artist/${data.artist}`}
      >
        <Image
          className=" min-w-14 rounded-full border  mr-4 border-default h-14 aspect-square"
          src={data.cover}
          height={56}
          width={56}
          alt="Artist Cover"
        />
      </Link>
      <div className="py-[21px] rounded-lg px-[23px] bg-[#1A1A1A]">
        <h2 className="mb-[9px] text-para   font-bold">{data.name}</h2>
        <p className="text-white">{data.details}</p>
      </div>
    </div>
  );
}

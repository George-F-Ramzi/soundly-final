import { IArtist } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ArtistCard({ data }: { data: IArtist }) {
  return (
    <div className='max-w-[146px] flex flex-col items-center h-fit'>
      <Link
        className='block'
        href={`/artist/${data.id}`}
      >
        <Image
          role='artistCard__cover'
          alt='Artist Cover'
          height={146}
          width={144}
          src={data.cover}
          className='max-w-[146px] object-cover rounded-full mb-[19px] h-[146px]'
        />
      </Link>
      <div>
        <Link
          role='artistCard__name'
          href={`artist/${data.id}`}
          className='text-2xl sm:text-xl  leading-[200%] sm:leading-normal block font-bold text-center text-white'
        >
          {data.name}
        </Link>
        <p
          role='artistCard__followers'
          className='text-xl sm:text-xs  font-medium text-center text-para'
        >
          {data.followers}: followers
        </p>
      </div>
    </div>
  );
}

import { InboxCardType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function InboxCard({ data }: { data: InboxCardType }) {
  const handleTo = () => {
    if (data.message.includes("Started")) {
      return `/artist/${data.trigger}`;
    }
    if (data.message.includes("Commented")) {
      return `/song/${data.song}`;
    }

    if (data.message.includes("Uploaded")) {
      return `/song/${data.song}`;
    }

    return `/song/${data.song}`;
  };

  return (
    <Link
      href={handleTo()}
      className=" block cursor-pointer hover:bg-[#1A1A1A] mt-[15px] border border-default p-4 rounded-2xl"
    >
      <div className="flex items-center">
        <Image
          className="rounded-full border border-default aspect-square min-w-[72px] h-[72px]"
          alt="Artist Cover"
          height={72}
          width={72}
          src={data.cover}
        />
        <div className="ml-5">
          <h2 className="text-sm text-para mb-[5px] font-bold">{data.name}</h2>
          <h2 className="text-white font-bold text-[20px]">{data.message}</h2>
        </div>
      </div>
    </Link>
  );
}

import { ISong } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function Player({ song }: { song: ISong }) {
  return (
    <div className="fixed sm:flex sm:h-20 sm:pt-[10px] sm:pb-[14px] px-6 pb-[13px] pt-[8px] bg-[#141414] left-0 h-[117px] bottom-0 w-full">
      <div className="flex min-w-fit sm:mr-[47px] items-center mb-2">
        <Link href={`/song/${song.id}`}>
          <Image
            alt="song cover"
            src={song.cover}
            height={56}
            width={56}
            className="aspect-square  mr-[15px] w-14 h-14 border rounded border-default"
          />
        </Link>
        <div>
          <Link
            href={`/song/${song.id}`}
            className="text-xl block text-white font-bold"
          >
            {song.name}
          </Link>
          <Link
            href={`/artist/${song.artist}`}
            className="text-sm block font-medium text-para"
          >
            {song.username}
          </Link>
        </div>
      </div>
      <AudioPlayer
        layout="horizontal"
        showJumpControls={false}
        src={song.song}
        autoPlay
        showDownloadProgress={false}
      />
    </div>
  );
}

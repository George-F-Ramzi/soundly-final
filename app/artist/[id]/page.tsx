import SongsSection from "@/components/songsSection";
import { db } from "@/db/db";
import { Artists, Songs } from "@/db/schema";
import { ISong } from "@/utils/types";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

interface Prop {
  params: { id: string };
}

export const fetchCache = "default-no-store";

export async function generateMetadata({ params }: Prop): Promise<Metadata> {
  let { id } = params;

  const artist = await db
    .select({ name: Artists.name })
    .from(Artists)
    .where(eq(Artists.id, Number(id)));

  return {
    title: artist[0].name,
  };
}

export default async function Artist({ params }: Prop) {
  let { id } = params;

  let artist = await db
    .select({
      id: Artists.id,
      name: Artists.name,
      followers: Artists.followers,
      following: Artists.following,
      songs: Artists.songs,
      cover: Artists.cover,
    })
    .from(Artists)
    .where(eq(Artists.id, Number(id)));

  let songs = await db
    .select({
      id: Songs.id,
      username: Artists.name,
      cover: Songs.cover,
      song: Songs.song,
      likes: Songs.likes,
      name: Songs.name,
      artist: Songs.artist,
    })
    .from(Songs)
    .where(eq(Songs.artist, Number(id)))
    .leftJoin(Artists, eq(Artists.id, Number(id)));

  return (
    <div className="mt-16">
      <section className="flex">
        <Image
          className="min-w-[100px] border border-default sm:min-w-[200px] sm:h-[200px] aspect-square rounded-full h-[100px]"
          height={100}
          width={100}
          src={artist[0].cover!}
          alt="Artist Cover"
        />
        <div className="sm:ml-9 ml-[15px]">
          <h2 className="text-para font-bold sm:text-base sm:mb-[11px] text-sm mb-2">
            Artist
          </h2>
          <h2 className="text-white font-bold sm:mb-1 mb-2 sm:text-4xl text-2xl">
            {artist[0].name!}
          </h2>
          <div className="flex  mb-[29px]">
            <p className="text-xs sm:text-base  text-para font-medium">
              {artist[0].followers!} Followers
            </p>
            <p className="text-xs sm:text-base ml-[13px] sm:ml-[21px]  text-para font-medium">
              {artist[0].following!} Following
            </p>
            <p className="text-xs sm:text-base ml-[13px] sm:ml-[21px] text-para font-medium">
              {artist[0].songs!} Songs
            </p>
          </div>
          <button className="px-10 py-2 rounded-full sm:px-12 sm:py-4 text-black font-bold bg-button">
            Follow
          </button>
        </div>
      </section>
      <SongsSection
        title={"Uploaded"}
        data={songs as ISong[]}
      />
    </div>
  );
}
import AuFollow from "@/components/Authorized/AuFollow";
import UnFollow from "@/components/UnAuthorized/UnFollow";
import SongsSection from "@/components/songsSection";
import { db } from "@/db/db";
import { Artists, Follower, Songs } from "@/db/schema";
import { ISong } from "@/utils/types";
import { and, eq } from "drizzle-orm";
import { jwtVerify } from "jose";
import { Metadata } from "next";
import { cookies } from "next/headers";
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
  let authorized = false;
  let user = 0;
  let followed = false;

  try {
    let cookie = cookies();
    let token = cookie.get("token");
    let { payload } = await jwtVerify(
      token?.value!,
      new TextEncoder().encode(process.env.JWT_PASS)
    );
    user = Number(payload.id);
    authorized = true;
  } catch (error) {
    authorized = false;
  }

  if (authorized) {
    let isFollowed = await db
      .select()
      .from(Follower)
      .where(and(eq(Follower.artist, user), eq(Follower.fan, Number(id))));

    if (isFollowed.length === 0) followed = false;
    else followed = true;
  }

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
    <div className='mt-16'>
      <section className='flex'>
        <Image
          className='min-w-[100px] border border-default sm:min-w-[200px] sm:h-[200px] aspect-square rounded-full h-[100px]'
          height={100}
          width={100}
          src={artist[0].cover!}
          alt='Artist Cover'
        />
        <div className='sm:ml-9 ml-[15px]'>
          <h2 className='text-para font-bold sm:text-base sm:mb-[11px] text-sm mb-2'>
            Artist
          </h2>
          <h2
            role='artist__name'
            className='text-white font-bold sm:mb-1 mb-2 sm:text-4xl text-2xl'
          >
            {artist[0].name!}
          </h2>
          <div className='flex  mb-[29px]'>
            <p
              role='artist__followers'
              className='text-xs sm:text-base  text-para font-medium'
            >
              {artist[0].followers!} Followers
            </p>
            <p
              role='artist__following'
              className='text-xs sm:text-base ml-[13px] sm:ml-[21px]  text-para font-medium'
            >
              {artist[0].following!} Following
            </p>
            <p
              role='artist__songs'
              className='text-xs sm:text-base ml-[13px] sm:ml-[21px] text-para font-medium'
            >
              {artist[0].songs!} Songs
            </p>
          </div>
          {!authorized ? (
            <UnFollow />
          ) : (
            <AuFollow
              followed={followed}
              id={Number(id)}
            />
          )}
        </div>
      </section>
      <SongsSection
        title={"Uploaded"}
        data={songs as ISong[]}
      />
    </div>
  );
}

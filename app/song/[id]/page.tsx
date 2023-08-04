import AuComments from "@/components/Authorized/AuComments";
import AuLike from "@/components/Authorized/AuLike";
import UnComments from "@/components/UnAuthorized/UnComments";
import UnLike from "@/components/UnAuthorized/UnLike";
import Play from "@/components/play";
import { db } from "@/db/db";
import { Artists, Comments, Like, Songs } from "@/db/schema";
import { IComment, ISong } from "@/utils/types";
import { and, eq } from "drizzle-orm";
import { jwtVerify } from "jose";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

export const fetchCache = "default-no-store";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  //
  let { id } = params;

  const song = await db
    .select({ name: Songs.name })
    .from(Songs)
    .where(eq(Songs.id, Number(id)));

  return {
    title: song[0].name,
  };
}

export default async function Song({ params }: { params: { id: string } }) {
  let { id } = params;
  let authorized = false;
  let user = 0;
  let liked = false;

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
    let isLiked = await db
      .select()
      .from(Like)
      .where(and(eq(Like.artist, user), eq(Like.song, Number(id))));

    if (isLiked.length === 0) liked = false;
    else liked = true;
  }

  let song = await db
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
    .where(eq(Songs.id, Number(id)))
    .leftJoin(Artists, eq(Artists.id, Songs.artist));

  let comments = await db
    .select({
      id: Comments.id,
      song: Comments.song,
      artist: Comments.artist,
      details: Comments.details,
      name: Artists.name,
      cover: Artists.cover,
    })
    .from(Comments)
    .where(eq(Comments.song, Number(id)))
    .leftJoin(Artists, eq(Comments.artist, Artists.id));

  return (
    <div className='mt-16'>
      <section className='flex'>
        <Image
          role='song__cover'
          className='min-w-[100px] border border-default sm:min-w-[200px] sm:h-[200px] aspect-square rounded-full h-[100px]'
          height={100}
          width={100}
          src={song[0].cover!}
          alt='Song Cover'
        />
        <div className='sm:ml-9 ml-[15px]'>
          <h2 className='text-para font-bold sm:text-base sm:mb-[11px] text-sm mb-2'>
            Song
          </h2>
          <h2
            role='song__name'
            className='text-white font-bold sm:mb-1 mb-2 sm:text-4xl text-2xl'
          >
            {song[0].name!}
          </h2>
          <div className='flex  mb-[29px]'>
            <p
              role='song__likes'
              className='text-xs sm:text-base  text-para font-medium'
            >
              {song[0].likes!} Likes
            </p>
          </div>
          <div className='flex -ml-[5px] sm:ml-[5px]'>
            <Play song={song[0] as ISong} />
            {!authorized ? (
              <UnLike />
            ) : (
              <AuLike
                id={song[0].id!}
                liked={liked}
              />
            )}
          </div>
        </div>
      </section>
      <h2 className='text-white mt-[55px] font-bold text-4xl'>Comments</h2>
      {!authorized ? (
        <UnComments comments={comments as IComment[]} />
      ) : (
        <AuComments
          id={song[0].id!}
          comments={comments as IComment[]}
        />
      )}
    </div>
  );
}

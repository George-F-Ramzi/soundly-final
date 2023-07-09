import CommentCard from "@/components/Cards/commentCard";
import NothingHere from "@/components/nothing";
import { db } from "@/db/db";
import { Artists, Comments, Songs } from "@/db/schema";
import { IComment } from "@/utils/types";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
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
    <div className="mt-16">
      <section className="flex">
        <Image
          className="min-w-[100px] border border-default sm:min-w-[200px] sm:h-[200px] aspect-square rounded-full h-[100px]"
          height={100}
          width={100}
          src={song[0].cover!}
          alt="Song Cover"
        />
        <div className="sm:ml-9 ml-[15px]">
          <h2 className="text-para font-bold sm:text-base sm:mb-[11px] text-sm mb-2">
            Song
          </h2>
          <h2 className="text-white font-bold sm:mb-1 mb-2 sm:text-4xl text-2xl">
            {song[0].name!}
          </h2>
          <div className="flex  mb-[29px]">
            <p className="text-xs sm:text-base  text-para font-medium">
              {song[0].likes!} Likes
            </p>
          </div>
          <div className="flex -ml-[5px] sm:ml-[5px]">
            <button className="px-10 py-2 rounded-full sm:px-12 sm:py-4 text-black font-bold bg-button">
              Play
            </button>
            <button className="px-10 py-2 border ml-4 sm:ml-5 border-default rounded-full sm:px-12 sm:py-4 text-white font-bold bg-transparent">
              Like
            </button>
          </div>
        </div>
      </section>
      <h2 className="text-white mt-[55px] font-bold text-4xl">Comments</h2>
      <div className="h-14 mt-4 mb-8 hover:border-active px-6 flex items-center text-para border border-default rounded-full">
        What`s in your mind?
      </div>
      {Array.isArray(comments) && comments.length ? (
        comments.map((c, i) => {
          return (
            <CommentCard
              key={i}
              data={c as IComment}
            />
          );
        })
      ) : (
        <NothingHere />
      )}
    </div>
  );
}

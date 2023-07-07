import ArtistsSection from "@/components/artistsSection";
import SongsSection from "@/components/songsSection";
import { db } from "@/db/db";
import { Artists, Songs } from "@/db/schema";
import { IArtist, ISong } from "@/utils/types";
import { eq, like } from "drizzle-orm";
import React from "react";

export const fetchCache = "default-no-store";

interface Prop {
  params: { value: string };
}

export default async function Search({ params }: Prop) {
  let { value } = params;

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
    .where(like(Songs.name, `%${value}%`))
    .leftJoin(Artists, eq(Artists.id, Songs.artist));

  let artists = await db
    .select({
      id: Artists.id,
      name: Artists.name,
      followers: Artists.followers,
      following: Artists.following,
      songs: Artists.songs,
      cover: Artists.cover,
    })
    .from(Artists)
    .where(like(Artists.name, `%${value}%`));

  return (
    <div>
      <SongsSection
        data={songs as ISong[]}
        title={"Songs"}
      />
      <ArtistsSection
        data={artists as IArtist[]}
        title={"Artists"}
      />
    </div>
  );
}

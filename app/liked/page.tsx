import SongsSection from "@/components/songsSection";
import { db } from "@/db/db";
import { Artists, Like, Songs } from "@/db/schema";
import { ISong } from "@/utils/types";
import { eq } from "drizzle-orm";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export default async function Liked() {
  const cookie = cookies();
  let token = cookie.get("token");
  let { payload } = await jwtVerify(
    token?.value!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

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
    .from(Like)
    .where(eq(Like.artist, id))
    .leftJoin(Songs, eq(Songs.id, Like.song))
    .leftJoin(Artists, eq(Artists.id, Songs.artist));

  return (
    <div>
      <SongsSection
        data={songs as ISong[]}
        title={"Liked Songs"}
      />
    </div>
  );
}

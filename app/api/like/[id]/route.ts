import { db } from "@/db/db";
import { Like, Notification, Songs } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  let url = req.url;
  let index = url.indexOf("like");
  let song_id = Number(url.slice(index + 5));
  let cookie = cookies();
  let token = cookie.get("token");
  let { payload } = await jwtVerify(
    token?.value!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

  try {
    let song = await db.select().from(Songs).where(eq(Songs.id, song_id));

    if (song.length === 0) {
      return new Response("This Song Doesn't Exist", { status: 400 });
    }

    await db.insert(Like).values({ artist: id, song: song_id });

    await db
      .update(Songs)
      .set({ likes: sql` ${Songs.likes} + 1 ` })
      .where(eq(Songs.id, song_id));

    if (id !== song[0].artist) {
      await db.insert(Notification).values({
        message: "Likes Your Song",
        notifier: song[0].artist,
        trigger: id,
        song: song_id,
      });
    }

    return new Response("Done", { status: 200 });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}
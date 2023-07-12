import { db } from "@/db/db";
import { Artists, Songs, Notification, Follower } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

interface IBody {
  name: string;
  audio: string;
  image: string;
}

export async function POST(req: Request) {
  let cookie = cookies();
  let token = cookie.get("token");
  let { payload } = await jwtVerify(
    token?.value!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

  try {
    let { name, audio, image }: IBody = await req.json();

    let { insertId } = await db
      .insert(Songs)
      .values({ cover: image, song: audio, name, artist: id });

    await db
      .update(Artists)
      .set({ songs: sql`${Artists.songs} + 1` })
      .where(eq(Artists.id, id));

    let followers = await db
      .select({ notifier: Follower.fan })
      .from(Follower)
      .where(eq(Follower.artist, id));

    let notification_data = followers.map((f) => {
      return {
        message: "Uploaded A New Song",
        notifier: f.notifier,
        trigger: id,
        song: Number(insertId),
      };
    });

    await db.insert(Notification).values(notification_data);

    return new Response("Done", { status: 200 });
  } catch (error) {
    return new Response("Something Wrong Happen" + error, { status: 400 });
  }
}

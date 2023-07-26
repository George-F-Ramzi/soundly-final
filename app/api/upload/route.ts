import { db } from "@/db/db";
import { Artists, Songs, Notification, Follower } from "@/db/schema";
import pusherHandler from "@/utils/pusher";
import { eq, sql } from "drizzle-orm";
import Joi, { Schema } from "joi";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

  let data: IBody = await req.json();

  const schema: Schema = Joi.object({
    name: Joi.string().required().min(1).max(16).label("name"),
    audio: Joi.string().required().min(8).max(900).label("audio"),
    image: Joi.string().required().min(8).max(900).label("image"),
  });

  const { error } = schema.validate(data);
  if (error) {
    return new Response("Something Wrong Happen" + error, { status: 400 });
  }

  try {
    let { insertId } = await db.insert(Songs).values({
      cover: data.image,
      song: data.audio,
      name: data.name,
      artist: id,
    });

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

    let artist = await db.select().from(Artists).where(eq(Artists.id, id));

    for (let index = 0; index < followers.length; index++) {
      await pusherHandler.trigger(String(followers[index].notifier), "listen", {
        message: "Uploaded A New Song",
        photo: artist[0].cover,
        username: artist[0].name,
      });
    }

    return NextResponse.json({ id });
  } catch (error) {
    return new Response("Something Wrong Happen" + error, { status: 400 });
  }
}

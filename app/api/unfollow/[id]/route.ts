import { db } from "@/db/db";
import { Artists, Follower } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function DELETE(req: Request) {
  let url = req.url;
  let index = url.indexOf("unfollow");
  let artist_id = Number(url.slice(index + 9));
  let cookie = cookies();
  let token = cookie.get("token");
  let { payload } = await jwtVerify(
    token?.value!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

  try {
    await db
      .delete(Follower)
      .where(and(eq(Follower.artist, artist_id), eq(Follower.fan, id)));

    await db
      .update(Artists)
      .set({
        followers: sql` ${Artists.followers} - 1 `,
      })
      .where(eq(Artists.id, artist_id));

    await db
      .update(Artists)
      .set({
        following: sql`${Artists.following} - 1 `,
      })
      .where(eq(Artists.id, id));
    return new Response("Done", { status: 200 });
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}

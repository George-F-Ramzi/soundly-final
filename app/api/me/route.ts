import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { Artists } from "@/db/schema";
import { eq } from "drizzle-orm";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  let cookie = cookies();
  let token = cookie.get("token");
  let { payload } = await jwtVerify(
    token?.value!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

  try {
    let result = await db
      .select({
        id: Artists.id,
        name: Artists.name,
        followers: Artists.followers,
        following: Artists.following,
        songs: Artists.songs,
        cover: Artists.cover,
      })
      .from(Artists)
      .where(eq(Artists.id, id));

    if (result.length === 0) return NextResponse.json(false);
    return NextResponse.json(result[0]);
  } catch (error) {
    return new Response("Something Wrong Happen", { status: 400 });
  }
}

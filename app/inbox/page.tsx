import InboxCard from "@/components/Cards/inboxCard";
import NothingHere from "@/components/nothing";
import { db } from "@/db/db";
import { Artists, Notification } from "@/db/schema";
import { InboxCardType } from "@/utils/types";
import { eq } from "drizzle-orm";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import React from "react";

export const revalidate = 0;

export default async function Inbox() {
  const cookie = cookies();
  let token = cookie.get("token");
  let { payload } = await jwtVerify(
    token?.value!,
    new TextEncoder().encode(process.env.JWT_PASS)
  );
  let id = Number(payload.id);

  let data = await db
    .select({
      id: Notification.id,
      trigger: Notification.trigger,
      notifier: Notification.notifier,
      message: Notification.message,
      song: Notification.song,
      cover: Artists.cover,
      name: Artists.name,
    })
    .from(Notification)
    .where(eq(Notification.notifier, id))
    .leftJoin(Artists, eq(Artists.id, Notification.trigger));

  return (
    <div className="mt-[55px]">
      <h2 className="text-white font-bold text-4xl">Inbox</h2>
      {Array.isArray(data) && data.length ? (
        data.map((e, i) => {
          return (
            <InboxCard
              key={i}
              data={e as InboxCardType}
            />
          );
        })
      ) : (
        <NothingHere />
      )}
    </div>
  );
}

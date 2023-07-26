"use client";

import React, { useContext, useEffect } from "react";
import Pusher from "pusher-js";
import TokenContext from "@/utils/tokenContext";
import { IToast } from "@/utils/types";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

const pusher = new Pusher(process.env.NEXT_PUBLIC_key!, {
  cluster: process.env.NEXT_PUBLIC_cluster!,
});

export default function NotificationHandler() {
  const { me } = useContext(TokenContext);
  const navigate = useRouter();

  useEffect(() => {
    if (me === undefined) return;

    let channel = pusher.subscribe(String(me?.id));

    channel.bind("listen", (data: IToast) => {
      const handleTo = () => {
        if (data.message.includes("Started")) {
          return `/artist/${data.artist}`;
        }
        if (data.message.includes("Commented")) {
          return `/song/${data.song}`;
        }

        if (data.message.includes("Uploaded")) {
          return `/song/${data.song}`;
        }

        return `/song/${data.song}`;
      };

      toast(({ closeToast }) => (
        <div
          onClick={() => {
            navigate.push(handleTo());
            closeToast && closeToast();
          }}
          className='flex h-full w-full cursor-pointer items-center'
        >
          <Image
            className='w-[56px] h-[56px] mr-4 rounded-full'
            alt='trigger face'
            height={56}
            width={56}
            src={data.photo}
          />
          <div>
            <h2 className='text-para text-sm'>{data.username}</h2>
            <h3 className='text-black font-bold'>{data.message}</h3>
          </div>
        </div>
      ));
    });

    return () => {
      pusher.unsubscribe(String(me?.id));
    };
  }, [me, navigate]);

  return <></>;
}

"use client";

import TokenContext from "@/utils/tokenContext";
import { ITokenContext } from "@/utils/types";
import { useContext, useEffect, useState } from "react";

export default function AuFollow({
  followed,
  id,
}: {
  followed: boolean;
  id: number;
}) {
  const [isFollowed, setIsFollowed] = useState(false);
  const { me }: ITokenContext = useContext(TokenContext);

  useEffect(() => {
    setIsFollowed(followed);
  }, [followed]);

  if (me?.id === id) return;

  if (!isFollowed)
    return (
      <button
        role='follow'
        onClick={async () => {
          setIsFollowed(true);
          await fetch(`https://soundly-peach.vercel.app/api/follow/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }}
        className='px-10 py-2 rounded-full sm:px-12 sm:py-4 text-black font-bold bg-button'
      >
        Follow
      </button>
    );

  return (
    <button
      role='unFollow'
      onClick={async () => {
        setIsFollowed(false);
        await fetch(`https://soundly-peach.vercel.app/api/unfollow/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }}
      className='px-10 py-2 bg-[#1A1A1A] border  border-default rounded-full sm:px-12 sm:py-4 text-white font-bold'
    >
      Unfollow
    </button>
  );
}

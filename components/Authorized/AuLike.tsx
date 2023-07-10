"use client";

import { useEffect, useState } from "react";

export default function AuLike({ liked, id }: { liked: boolean; id: number }) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  if (!isLiked)
    return (
      <button
        onClick={async () => {
          setIsLiked(true);
          await fetch(`https://soundly-peach.vercel.app/api/like/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }}
        className="px-10 py-2 border ml-4 sm:ml-5 border-default rounded-full sm:px-12 sm:py-4 text-white font-bold bg-transparent"
      >
        Like
      </button>
    );

  return (
    <button
      onClick={async () => {
        setIsLiked(false);
        await fetch(`https://soundly-peach.vercel.app/api/dislike/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }}
      className="px-10 py-2 bg-[#1A1A1A] border ml-4 sm:ml-5 border-default rounded-full sm:px-12 sm:py-4 text-white font-bold"
    >
      Dislike
    </button>
  );
}

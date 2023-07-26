"use client";

import TokenContext from "@/utils/tokenContext";
import { IComment, ITokenContext } from "@/utils/types";
import { useContext, useEffect, useState } from "react";
import CommentCard from "../Cards/commentCard";
import NothingHere from "../nothing";

interface Prop {
  comments: IComment[];
  id: number;
}

export default function AuComments({ comments, id }: Prop) {
  const { me }: ITokenContext = useContext(TokenContext);
  const [data, setData] = useState<IComment[]>([]);
  const [IValue, setInput] = useState("");

  useEffect(() => {
    setData(comments);
  }, [comments]);

  const HandlePost = async () => {
    let clone: IComment[] = [...comments];
    clone.unshift({
      cover: me?.cover!,
      artist: me?.id!,
      details: IValue,
      id: Math.random(),
      name: me?.name!,
      song: id,
    });
    setData(clone);
    setInput("");

    await fetch(`https://soundly-peach.vercel.app/api/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ details: IValue }),
    });
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          HandlePost();
        }}
      >
        <input
          required
          minLength={1}
          name='details'
          value={IValue}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder='What`s in your mind?'
          className='h-14 w-full valid:text-white bg-transparent mt-4 mb-8 cursor-pointer hover:border-active px-6 flex items-center text-para border border-default rounded-full'
        />
      </form>
      {Array.isArray(data) && data.length ? (
        data.map((c, i) => {
          return (
            <CommentCard
              key={i}
              data={c as IComment}
            />
          );
        })
      ) : (
        <NothingHere />
      )}
    </div>
  );
}

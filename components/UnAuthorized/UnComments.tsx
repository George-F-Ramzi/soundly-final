"use client";

import { IComment, ITokenContext } from "@/utils/types";
import React, { useContext } from "react";
import NothingHere from "../nothing";
import CommentCard from "../Cards/commentCard";
import TokenContext from "@/utils/tokenContext";

interface Prop {
  comments: IComment[];
}

export default function UnComments({ comments }: Prop) {
  const { setShow }: ITokenContext = useContext(TokenContext);
  return (
    <div>
      <div
        onClick={() => setShow && setShow(true)}
        className="h-14 mt-4 mb-8 cursor-pointer hover:border-active px-6 flex items-center text-para border border-default rounded-full"
      >
        What`s in your mind?
      </div>
      {Array.isArray(comments) && comments.length ? (
        comments.map((c, i) => {
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

"use client";

import TokenContext from "@/utils/tokenContext";
import { ITokenContext } from "@/utils/types";
import React, { useContext } from "react";

export default function UnLike() {
  const { setShow }: ITokenContext = useContext(TokenContext);

  return (
    <button
      onClick={() => setShow && setShow(true)}
      className="px-10 py-2 border ml-4 sm:ml-5 border-default rounded-full sm:px-12 sm:py-4 text-white font-bold bg-transparent"
    >
      Like
    </button>
  );
}

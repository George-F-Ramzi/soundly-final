"use client";

import TokenContext from "@/utils/tokenContext";
import { ITokenContext } from "@/utils/types";
import React, { useContext } from "react";

export default function UnFollow() {
  const { setShow }: ITokenContext = useContext(TokenContext);

  return (
    <button
      role='follow'
      onClick={() => setShow && setShow(true)}
      className='px-10 py-2 rounded-full sm:px-12 sm:py-4 text-black font-bold bg-button'
    >
      Follow
    </button>
  );
}

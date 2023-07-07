"use client";
import TokenContext from "@/utils/tokenContext";
import { ITokenContext } from "@/utils/types";
import React, { useContext } from "react";
import { RiCloseLine } from "react-icons/ri";

export default function JoinSlideout() {
  const { setShow }: ITokenContext = useContext(TokenContext);
  return (
    <div className="w-screen flex h-screen fixed right-0 top-0">
      <div className="bg-black w-full h-full opacity-80"></div>
      <div className="bg-[#191919] min-w-[360px] p-8 h-full ">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold">Join</h2>
          <RiCloseLine
            onClick={() => setShow && setShow(false)}
            width={24}
            height={24}
            className="text-white cursor-pointer w-6 h-6"
          />
        </div>
      </div>
    </div>
  );
}

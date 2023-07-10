"use client";

import PlayerContext from "@/utils/playerContext";
import { IContextPlayer, ISong } from "@/utils/types";
import { useContext } from "react";

export default function Play({ song }: { song: ISong }) {
  const { setSong }: IContextPlayer = useContext(PlayerContext);

  return (
    <button
      onClick={() => setSong && setSong(song)}
      className="px-10 py-2 rounded-full sm:px-12 sm:py-4 text-black font-bold bg-button"
    >
      Play
    </button>
  );
}

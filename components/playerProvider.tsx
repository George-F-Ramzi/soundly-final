"use client";

import PlayerContext from "@/utils/playerContext";
import { ISong } from "@/utils/types";
import { ReactNode, useState } from "react";
import Player from "./player";

export default function PlayerProvider({ children }: { children: ReactNode }) {
  const [song, setSong] = useState<ISong>();

  return (
    <div>
      <PlayerContext.Provider value={{ setSong }}>
        {children}
      </PlayerContext.Provider>
      {song ? <Player song={song} /> : ""}
    </div>
  );
}

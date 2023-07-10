"use client";

import PlayerContext from "@/utils/playerContext";
import { ISong } from "@/utils/types";
import { ReactNode, useState } from "react";

export default function PlayerProvider({ children }: { children: ReactNode }) {
  const [song, setSong] = useState<ISong>();

  return (
    <div>
      <PlayerContext.Provider value={{ setSong }}>
        {children}
      </PlayerContext.Provider>
    </div>
  );
}

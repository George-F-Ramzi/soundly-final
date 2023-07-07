"use client";

import TokenContext from "@/utils/tokenContext";
import { IArtist } from "@/utils/types";
import { ReactNode, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import JoinSlideout from "./Slideouts/joinSlideout";

export default function TokenProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [me, setMe] = useState<IArtist>();

  useEffect(() => {
    let token = getCookie("token");
    if (token) setToken(String(token));
  }, []);

  return (
    <div>
      <TokenContext.Provider value={{ setShow, token, setToken, setMe, me }}>
        {children}
      </TokenContext.Provider>
      {show ? <JoinSlideout /> : ""}
    </div>
  );
}

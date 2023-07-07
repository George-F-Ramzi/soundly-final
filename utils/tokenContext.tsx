"use client";

import { createContext } from "react";
import { ITokenContext } from "./types";

let TokenContext = createContext<ITokenContext>({});

export default TokenContext;

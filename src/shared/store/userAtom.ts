// src/shared/store/userAtom.ts
import { atom } from "jotai";

import { GoogleUser } from "@/types/User";

export const userAtom = atom<GoogleUser | null>(null);

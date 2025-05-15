// src/shared/store/convertAtoms.ts
import { atom } from "jotai";

export const statusAtom = atom<
  "idle" | "uploading" | "converting" | "success" | "error"
>("idle");
export const txtUrlAtom = atom<string | null>(null);
export const percentAtom = atom(0);
export const targetPercentAtom = atom(0);
export const requestIdAtom = atom("");

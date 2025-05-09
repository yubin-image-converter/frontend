// src/features/askii-convert/types/index.ts

export const formatOptions = ["jpg", "png", "webp"] as const;

export type Format = (typeof formatOptions)[number];

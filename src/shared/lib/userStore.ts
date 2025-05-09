import { GoogleUser } from "@/types/User";

// src/lib/userStore.ts
export let currentUser: GoogleUser | null = null;

export function setCurrentUser(user: GoogleUser) {
  currentUser = user;
}

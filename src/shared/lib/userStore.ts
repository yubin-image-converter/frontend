import { GoogleUser } from "@/types/User";

export let currentUser: GoogleUser | null = null;

export function setCurrentUser(user: GoogleUser) {
  currentUser = user;
}

export function getCurrentUser(): GoogleUser | null {
  return currentUser;
}

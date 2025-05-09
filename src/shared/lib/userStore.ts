import { GoogleUser } from "@/types/User";

let currentUser: GoogleUser | null = null;

export function setCurrentUser(user: GoogleUser | null) {
  currentUser = user;
}

export function getCurrentUser(): GoogleUser | null {
  return currentUser;
}

export function clearCurrentUser() {
  currentUser = null;
}

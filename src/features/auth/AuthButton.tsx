import { useEffect, useState } from "react";

import { setCurrentUser } from "@/shared/lib";
import axiosInstance from "@/shared/lib/axiosInstance";
import { getCookie } from "@/utils/getCookie";

import { AuthModal } from "./AuthModal";
import { logoutUser } from "@/shared/lib/logoutUser";

interface GoogleUser {
  name: string;
  email: string;
  publicId: string;
  provider: string;
}

export function AuthButton() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    if (accessToken) {
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600`;
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) return;

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosInstance.get("/users/me").then((res) => {
      setUser(res.data);
      setCurrentUser(res.data);
    });
  }, []);

  const handleLogout = () => logoutUser();
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-sm text-green-600 transition hover:text-green-300"
      >
        ▸ {user ? "User" : "Sign in"}
      </button>
      <AuthModal
        open={open}
        onClose={() => setOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}

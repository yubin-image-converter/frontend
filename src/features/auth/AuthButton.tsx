import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { userAtom } from "@/shared/store/userAtom";

import { AuthModal } from "./AuthModal";

export function AuthButton() {
  const user = useAtomValue(userAtom);
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-[12px] text-green-600 transition hover:text-green-300 sm:text-sm"
      >
        <span className="hidden sm:inline">
          <span className="tracking-tight">
            {user
              ? `[$ whoami: ${user.email.split("@")[0]}]`
              : `[ login required ]`}
          </span>
        </span>
        <span className="sm:hidden">
          [
          <span className="tracking-tight">
            {user ? user.email.split("@")[0] : "login"}
          </span>
          ]
        </span>
      </button>

      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

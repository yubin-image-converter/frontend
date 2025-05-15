import { useSetAtom } from "jotai";

import axiosInstance from "@/shared/lib/axiosInstance";
import { userAtom } from "@/shared/store/userAtom";

export function useLogout() {
  const setUser = useSetAtom(userAtom);

  return () => {
    document.cookie = "accessToken=; max-age=0; path=/";
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
  };
}

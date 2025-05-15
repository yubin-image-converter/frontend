import { useContext } from "react";

import { SocketContext } from "../contexts/SocketContext";

export function useSocketContext() {
  return useContext(SocketContext);
}

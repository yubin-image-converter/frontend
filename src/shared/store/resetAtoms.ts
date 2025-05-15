import { useSetAtom } from "jotai";

import {
  percentAtom,
  requestIdAtom,
  statusAtom,
  targetPercentAtom,
  txtUrlAtom,
} from "./convertAtoms";

export function useResetConversionState() {
  const setTxtUrl = useSetAtom(txtUrlAtom);
  const setPercent = useSetAtom(percentAtom);
  const setTargetPercent = useSetAtom(targetPercentAtom);
  const setStatus = useSetAtom(statusAtom);
  const setRequestId = useSetAtom(requestIdAtom);

  return () => {
    setTxtUrl(null);
    setPercent(0);
    setTargetPercent(0);
    setStatus("idle");
    setRequestId("");
  };
}

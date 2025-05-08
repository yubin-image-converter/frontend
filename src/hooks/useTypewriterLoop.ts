import { useEffect, useState } from "react";

export function useTypewriterLoop(message: string, speed = 100, delay = 1000) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index < message.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + message[index]);
        setIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText("");
        setIndex(0);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [index, message, speed, delay]);

  return text + (showCursor ? " █" : "");
}

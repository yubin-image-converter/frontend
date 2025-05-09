import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed(""); // 초기화

    let i = 0;
    const characters: string[] = [];

    const interval = setInterval(() => {
      characters.push(text[i]);
      setDisplayed(characters.join(""));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

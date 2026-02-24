import { useState, useEffect } from "react";

export function usePrefersDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches); // початковий стан

    const handleChange = (e: any) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDark;
}

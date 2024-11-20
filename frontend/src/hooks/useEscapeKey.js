import { useEffect } from "react";

const useEscapeKey = (handler) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handler]);
};

export default useEscapeKey;

import { useEffect, useRef } from "react";

export const useInterval = (fn: any, delay: number | null) => {
  const cb = useRef<any>(null);
  useEffect(() => {
    cb.current = fn;
  }, [fn]);

  useEffect(() => {
    function tick() {
      cb.current();
    }
    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [delay]);
};

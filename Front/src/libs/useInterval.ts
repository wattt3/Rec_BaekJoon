import { useEffect, useRef } from "react";

type callback = () => void;

export const useInterval = (fn: callback, delay: number | null) => {
  const cb = useRef<callback | null>(null);
  useEffect(() => {
    cb.current = fn;
  }, [fn]);

  useEffect(() => {
    function tick() {
      if (cb.current) {
        cb.current();
      }
    }
    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [delay]);
};

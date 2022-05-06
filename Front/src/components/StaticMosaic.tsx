import React, { useEffect, useRef } from "react";

const MOSAIC_SIZE = 30;

const StaticMosaic: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const canvas = useRef(document.createElement("canvas"));
  const ctx = useRef(canvas.current.getContext("2d"));
  const stageWidth = useRef(0);
  const stageHeight = useRef(0);

  const paint = () => {
    if (
      container.current &&
      stageWidth.current > 0 &&
      stageHeight.current > 0 &&
      ctx.current
    ) {
      const rows = Math.ceil(stageHeight.current / MOSAIC_SIZE);
      const columns = Math.ceil(stageWidth.current / MOSAIC_SIZE);

      for (let i = 0; i < rows; i++) {
        const y = (i + 0.5) * MOSAIC_SIZE;
        for (let j = 0; j < columns; j++) {
          const x = (j + 0.5) * MOSAIC_SIZE;
          ctx.current.beginPath();

          ctx.current.fillStyle = "#1e293b";
          ctx.current.fillRect(
            x - MOSAIC_SIZE / 2,
            y - MOSAIC_SIZE / 2,
            MOSAIC_SIZE,
            MOSAIC_SIZE
          );
          ctx.current.beginPath();
          ctx.current.fillStyle = `#0f172a`;
          ctx.current.arc(x, y, MOSAIC_SIZE / 2, 0, Math.PI * 2, false);
          ctx.current.fill();
        }
      }
    }
  };

  const handleResize = () => {
    if (container.current) {
      stageWidth.current = container.current.clientWidth;
      stageHeight.current = container.current.clientHeight;
      canvas.current.width = stageWidth.current;
      canvas.current.height = stageHeight.current;
      paint();
    }
  };

  useEffect(() => {
    if (container.current) {
      container.current.appendChild(canvas.current);
      handleResize();
    }
  }, [container]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      ref={container}
      className="w-full h-full overflow-hidden bg-slate-900"
    ></div>
  );
};

export default React.memo(StaticMosaic);

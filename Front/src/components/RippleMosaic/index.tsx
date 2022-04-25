/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef } from "react";
import { Ripple } from "./ripple";
import { Dot } from "./dot";
import { collide } from "./utils";

const PIXEL_SIZE = 30;
const PIXEL_RADIUS = Math.round(PIXEL_SIZE / 2);

interface IRippleMosaic {
  delay: number;
}

const RippleMosaic: React.FC<IRippleMosaic> = ({ delay }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  const ctx = useRef<CanvasRenderingContext2D>(canvas.current.getContext("2d"));
  const stageWidth = useRef<number>(0);
  const stageHeight = useRef<number>(0);
  const pixelRatio = useRef<number>(1);
  const ripple = useRef<Ripple | null>(null);
  const dots = useRef<Dot[]>([]);

  const clickCenter = () => {
    if (canvas.current) {
      const position = canvas.current.getBoundingClientRect();
      const x = Math.round(position.width / 2);
      const y = Math.round(position.height / 2);
      canvas.current.dispatchEvent(
        new MouseEvent("click", {
          clientX: x,
          clientY: y,
          bubbles: true,
        })
      );
    }
  };

  setTimeout(clickCenter, delay * 1000);

  const animate = () => {
    window.requestAnimationFrame(animate);
    if (ctx.current && ripple.current) {
      ripple.current.animate();

      for (let i = 0; i < dots.current.length; i++) {
        const dot = dots.current[i];
        const isCollide = collide(
          { x: dot.x, y: dot.y },
          { x: ripple.current.x, y: ripple.current.y },
          ripple.current.radius
        );
        if (isCollide) {
          dot.animate(ctx.current);
        }
      }
    }
  };

  const createDots = () => {
    const columns = Math.ceil(stageWidth.current / PIXEL_SIZE);
    const rows = Math.ceil(stageHeight.current / PIXEL_SIZE);

    for (let i = 0; i < rows; i++) {
      const y = (i + 0.5) * PIXEL_SIZE;

      for (let j = 0; j < columns; j++) {
        const x = (j + 0.5) * PIXEL_SIZE;
        const red = 15;
        const green = 23;
        const blue = 42;

        const dot = new Dot(x, y, PIXEL_SIZE, PIXEL_RADIUS, red, green, blue);
        dots.current.push(dot);
        // }
      }
    }
  };

  const onClick = (e: MouseEvent) => {
    ctx.current?.clearRect(0, 0, stageWidth.current, stageHeight.current);
    for (let i = 0; i < dots.current.length; i++) {
      dots.current[i].reset();
    }
    ripple?.current?.start(e.offsetX, e.offsetY);
  };

  useEffect(() => {
    if (container.current) {
      stageWidth.current = container.current.clientWidth;
      stageHeight.current = container.current.clientHeight;

      canvas.current.width = stageWidth.current * pixelRatio.current;
      canvas.current.height = stageHeight.current * pixelRatio.current;

      ctx.current?.scale(pixelRatio.current, pixelRatio.current);
      container.current.appendChild(canvas.current);

      // image.current.src = imgSrc;
      // image.current.crossOrigin = "Anonymous";
      // image.current.onload = () => {
      //   isloaded.current = true;
      //    drawImage();
      // };

      createDots();

      ripple.current = new Ripple(stageWidth.current, stageHeight.current);

      window.requestAnimationFrame(animate);
      canvas.current.addEventListener("click", onClick, false);

      return () => {
        canvas.current.removeEventListener("click", onClick, false);
      };
    }
  }, []);
  return <div className="w-full h-full" ref={container}></div>;
};

export default React.memo(RippleMosaic);

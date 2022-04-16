import { useEffect, useRef } from "react";

interface RGB {
  r: number;
  g: number;
  b: number;
}

const COLORS: RGB[] = [
  // { r: 15, g: 23, b: 42 }, //slate-900
  // { r: 30, g: 41, b: 59 }, //slate-800
  // { r: 51, g: 65, b: 85 }, //slate-700
  // { r: 203, g: 213, b: 225 }, // slate-300
  // { r: 100, g: 116, b: 139 }, //slate-500
  // { r: 71, g: 85, b: 105 }, //slate-600
  { r: 239, g: 68, b: 68 }, // red-500
  { r: 99, g: 102, b: 241 }, // indigo-500
  { r: 20, g: 184, b: 166 }, // teal-500
  // { r: 249, g: 115, b: 22 }, //orange-500
];

class GlowParticle {
  x: number;
  y: number;
  radius: number;
  rgb: { r: number; g: number; b: number };
  vx: number;
  vy: number;
  sinValue: number;
  constructor(x: number, y: number, radius: number, rgb: RGB) {
    this.x = x;
    this.y = y;
    this.rgb = rgb;
    this.radius = radius;

    this.vx = Math.random() * 4;
    this.vy = Math.random() * 4;

    this.sinValue = Math.random();
  }

  animate(
    ctx: CanvasRenderingContext2D,
    stageWidth: number,
    stageHeight: number
  ) {
    this.sinValue += 0.01;
    this.radius += Math.sin(this.sinValue);

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.vx *= -1;
      this.x += 10;
    } else if (this.x > stageWidth) {
      this.vx *= -1;
      this.x -= 10;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y += 10;
    } else if (this.y > stageHeight) {
      this.vy *= -1;
      this.y -= 10;
    }

    ctx.beginPath();
    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.01,
      this.x,
      this.y,
      this.radius
    );

    g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`);
    g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`);

    ctx.fillStyle = g;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

const MovingGradient: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const stageWidth = useRef<number | null>(document.body.clientWidth);
  const stageHeight = useRef<number | null>(document.body.clientHeight);
  const pixelRatio = useRef<number>(window.devicePixelRatio > 1 ? 2 : 1);
  const totalParticles = useRef(15);
  const particles = useRef<GlowParticle[] | null>([]);
  const minRadius = useRef(400);
  const maxRadius = useRef(900);

  const animate = () => {
    if (
      canvasRef.current &&
      canvasCtxRef.current &&
      stageWidth.current &&
      stageHeight.current &&
      particles.current
    ) {
      window.requestAnimationFrame(animate);
      canvasCtxRef.current.clearRect(
        0,
        0,
        stageWidth.current,
        stageHeight.current
      );

      for (let i = 0; i < totalParticles.current; i++) {
        const item = particles.current[i];
        item.animate(
          canvasCtxRef.current,
          stageWidth.current,
          stageHeight.current
        );
      }
    }
  };

  const createParticles = () => {
    if (
      canvasRef.current &&
      canvasCtxRef.current &&
      stageWidth.current &&
      stageHeight.current
    ) {
      let curColor = 0;
      particles.current = [];

      for (let i = 0; i < totalParticles.current; i++) {
        const item = new GlowParticle(
          Math.random() * stageWidth.current,
          Math.random() * stageHeight.current,
          Math.random() * (maxRadius.current - minRadius.current) +
            minRadius.current,
          COLORS[curColor]
        );
        if (++curColor >= COLORS.length) {
          curColor = 0;
        }

        particles.current[i] = item;
      }
    }
  };

  const handleResize = () => {
    if (canvasRef.current && canvasCtxRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvasCtxRef.current;

      stageWidth.current = document.body.clientWidth;
      stageHeight.current = document.body.clientHeight;

      canvas.width = stageWidth.current * pixelRatio.current;
      canvas.height = stageHeight.current * pixelRatio.current;

      ctx.scale(pixelRatio.current, pixelRatio.current);

      ctx.globalCompositeOperation = "saturation";

      createParticles();
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvasCtxRef.current = canvas.getContext("2d");

      window.addEventListener("resize", handleResize);
      handleResize();
      window.requestAnimationFrame(animate);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [canvasRef]);

  return (
    <canvas ref={canvasRef} className="w-full h-full bg-slate-900"></canvas>
  );
};

export default MovingGradient;

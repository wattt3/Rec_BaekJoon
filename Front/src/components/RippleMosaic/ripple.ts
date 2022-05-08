import { distance } from "./utils";

export class Ripple {
  x: number;
  y: number;
  radius: number;
  stageWidth: number;
  stageHeight: number;
  maxRadius: number;
  speed: number;
  constructor(stageWidth: number, stageHeight: number) {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.maxRadius = 0;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.speed = 10;
  }

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.maxRadius = this.getMax(this.x, this.y);
  }

  animate() {
    if (this.radius < this.maxRadius) {
      this.radius += this.speed;
    }
  }

  start(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = this.getMax(x, y);
  }

  getMax(x: number, y: number): number {
    const a = { x, y };
    const c1 = distance(a, { x: 0, y: 0 });
    const c2 = distance(a, { x: this.stageWidth, y: 0 });
    const c3 = distance(a, { x: 0, y: this.stageHeight });
    const c4 = distance(a, { x: this.stageWidth, y: this.stageHeight });
    return Math.max(c1, c2, c3, c4);
  }
}

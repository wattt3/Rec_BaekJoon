const BOUNCE = 0.8;

export class Dot {
  x: number;
  y: number;
  radius: number;
  targetRadius: number;
  radiusV: number;
  pixelSize: number;
  red: number;
  green: number;
  blue: number;

  constructor(
    x: number,
    y: number,
    pixelSize: number,
    radius: number,
    red: number,
    green: number,
    blue: number
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.targetRadius = radius;
    this.pixelSize = pixelSize;
    this.radiusV = 0;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  animate(ctx: CanvasRenderingContext2D) {
    const pixelHalf = this.pixelSize / 2;

    ctx.beginPath();

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(
      this.x - pixelHalf,
      this.y - pixelHalf,
      this.pixelSize,
      this.pixelSize
    );

    const accel = (this.targetRadius - this.radius) / 2;
    this.radiusV += accel;
    this.radiusV *= BOUNCE;
    this.radius += this.radiusV;

    ctx.beginPath();
    ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  reset() {
    this.radius = 0;
    this.radiusV = 0;
  }
}

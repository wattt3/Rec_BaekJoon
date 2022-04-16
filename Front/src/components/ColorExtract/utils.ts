interface Pos {
  x: number;
  y: number;
}

export function distance(a: Pos, b: Pos): number {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
}

export function collide(a: Pos, b: Pos, radius: number) {
  if (distance(a, b) < radius) {
    return true;
  } else {
    return false;
  }
}

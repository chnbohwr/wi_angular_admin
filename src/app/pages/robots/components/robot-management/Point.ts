export default class Point {
  canvas: ICanvas;
  x: number;
  y: number;
  color: string;

  constructor(
    canvas: ICanvas,
    x: number = 0,
    y: number = 0,
    color: string = 'rgba(255, 0, 0)',
  ) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  drawPoint() {
    const { cx } = this.canvas;

    cx.beginPath();
    cx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    cx.fillStyle = this.color;
    cx.fill();
    cx.closePath();
  }

  updatePoint() {
    const { width, height } = this.canvas;

    let x = this.x + Math.floor(Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);
    let y = this.y + Math.floor(Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);

    if (x > width) x -= width;
    if (x < 0) x += width;
    if (y > height) y -= height;
    if (y < 0) y += height;

    this.x = x;
    this.y = y;
  }
}

export interface IPoint {
  x: number,
  y: number,
  color: string,
  drawPoint,
  updatePoint,
}

interface ICanvas {
  width: number,
  height: number,
  cx: CanvasRenderingContext2D,
}

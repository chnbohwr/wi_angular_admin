import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-robot-management',
  templateUrl: './robot-management.component.html',
  styleUrls: ['./robot-management.component.scss']
})
export class RobotManagement implements AfterViewInit {
  @ViewChild('myCanvas') canvas: ElementRef;

  @Input() width = 800;
  @Input() height = 700;

  cx: CanvasRenderingContext2D;
  points: Array<IPoint> = [];

  ngAfterViewInit() {
    this.initialCanvas();
    this.createPoints();
  }

  initialCanvas() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;
  }

  drawPoint = (point: IPoint) => {
    this.cx.beginPath();
    this.cx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    this.cx.fillStyle = point.color;
    this.cx.fill();
    this.cx.closePath();
  }

  createPoints() {
    for (let i = 0; i < 1000; i++) {
      const point ={
        x: Math.floor(Math.random() * (this.width + 1)),
        y: Math.floor(Math.random() * (this.height + 1)),
        color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
      };

      this.points.push(point);
      this.drawPoint(point);
    }
  }

  updatePoint = () => {
    this.cx.clearRect(0, 0, this.width, this.height);
    this.points = this.points.map(point => {
      let x = point.x + Math.floor(Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);
      let y = point.y + Math.floor(Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);

      if (x > this.width) x -= this.width;
      if (x < 0) x += this.width;
      if (y > this.height) y -= this.height;
      if (y < 0) y += this.height;

      const newPoint = {
        ...point, x, y
      }

      this.drawPoint(newPoint);

      return newPoint;
    });

    window.requestAnimationFrame(this.updatePoint);
  }
}

interface IPoint {
  x: number,
  y: number,
  color: string,
}

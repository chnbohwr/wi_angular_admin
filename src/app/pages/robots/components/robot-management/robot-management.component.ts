import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Point, { IPoint } from './Point';
import { RobotJson } from './phraseFreqs';

@Component({
  selector: 'app-robot-management',
  templateUrl: './robot-management.component.html',
  styleUrls: ['./robot-management.component.scss']
})
export class RobotManagement implements AfterViewInit {
  @ViewChild('myCanvas') canvas: ElementRef;

  @Input() width = 960;
  @Input() height = 720;

  cx: CanvasRenderingContext2D;
  points: Array<IPoint> = [];

  robotPositions = [];
  position_index = 0;
  speed: number = 20;

  translatePos = position => ({
    x: 620 + position.y * 28,
    y: 255 + position.x * 29
  });

  ngAfterViewInit() {
    this.robotPositions = RobotJson.map(this.translatePos);
    this.initialCanvas();
    // this.createPoints();
    this.drawRoute();
  }

  initialCanvas() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;
  }

  drawRoute = () => {
    if (this.position_index > this.robotPositions.length) {
      this.position_index = 0;
      this.cx.clearRect(0, 0, this.width, this.height);
      window.requestAnimationFrame(this.drawRoute);
      return;
    }

    const positions = this.robotPositions.slice(this.position_index, this.position_index + this.speed);

    const initialPosition = positions[0];
    this.cx.moveTo(initialPosition.x, initialPosition.y);

    this.cx.beginPath();

    positions.forEach(position => {
      // draw line
      this.cx.lineTo(position.x, position.y);
      this.cx.strokeStyle="red";
      this.cx.stroke();
    });


    this.position_index += this.speed;
    window.requestAnimationFrame(this.drawRoute);
  }

  createPoints() {
    for (let i = 0; i < 1000; i++) {
      const x = Math.floor(Math.random() * (this.width + 1));
      const y = Math.floor(Math.random() * (this.height + 1));
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      const canvas = {
        cx: this.cx,
        width: this.width,
        height: this.height,
      };

      const point = new Point(canvas, x, y, color);
      point.drawPoint();

      this.points.push(point);
    }
  }

  animate = () => {
    // clear canvas render
    this.cx.clearRect(0, 0, this.width, this.height);

    this.points.forEach((point) => {
      point.updatePoint();
      point.drawPoint();
    });

    window.requestAnimationFrame(this.animate);
  }
}



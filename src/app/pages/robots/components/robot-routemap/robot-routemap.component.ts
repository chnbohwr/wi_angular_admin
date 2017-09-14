import { Component, OnInit } from '@angular/core';
import { hitAreas } from "ngvas";


@Component({
  selector: 'app-robot-routemap',
  templateUrl: './robot-routemap.component.html',
  styleUrls: ['./robot-routemap.component.scss']
})
export class RobotRoutemap implements OnInit {
  public circleX: number = 100;
  public circleY: number = 100;
  public circles = [];
  public PixelHitArea = hitAreas.PixelHitArea;
  constructor() {
    Array.from(Array(100)).forEach(() => {
      this.circles.push({
        x: Math.random() * 500,
        y: Math.random() * 500,
      })
    });
  }

  updateCircle = () => {
    this.circles = this.circles.map(circle => {
      let newX = circle.x + (Math.random() * 2) - 1;
      let newY = circle.y + (Math.random() * 2) - 1;
      if (newX > 500) { newX -= 500; }
      if (newX < 0) { newX += 500; }
      if (newY > 500) { newY -= 500; }
      if (newY < 0) { newY += 500; }
      const newPosition = {
        x: newX, y: newY
      };

      return newPosition;
    });
    window.requestAnimationFrame(this.updateCircle);
  }

  ngOnInit() {

  }

}

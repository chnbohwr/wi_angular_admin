import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { RobotHttpService } from '../robot-http/robot-http.service';
import { Observable, Subject } from 'rxjs/Rx';
import { RobotJson } from './phraseFreqs';

@Component({
  selector: 'app-robot-management',
  templateUrl: './robot-management.component.html',
  styleUrls: ['./robot-management.component.scss'],
  providers: [RobotHttpService],
})
export class RobotManagement implements AfterViewInit, OnDestroy {
  @ViewChild('myCanvas') canvas: ElementRef;

  @Input() width = 960;
  @Input() height = 720;

  private cx: CanvasRenderingContext2D;
  private robotPositions = [];
  private _destroy$: Subject<boolean> = new Subject();

  constructor(private robotService: RobotHttpService) {}

  translatePos = position => ({
    x: 620 + position.y * 28,
    y: 255 + position.x * 29
  });

  ngAfterViewInit() {
    this.initialCanvas();
    this.subscribeSocket();
  }

  httpError(e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  subscribeSocket() {
    // receive data & draw route
    this.robotService
      .getDataStream()
      .filter(msg => msg.data.message)
      .map(msg => msg.data.message)
      .takeUntil(this._destroy$)
      .subscribe(data => {
        if (data.finalPoint) {
          this.robotPositions = [];
        } else {
          this.robotPositions.push(this.translatePos(data.location));
        }

        this.drawRoute();
      }, this.httpError);

    // subscribe
    this.robotService.socket.onOpen(() => {
      this.robotService
        .subscribeChannel()
        .concat(this.robotService.showData(true))
        .takeUntil(this._destroy$)
        .subscribe();
    });
  }

  initialCanvas() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;
  }

  drawRoute = () => {
    this.cx.clearRect(0, 0, this.width, this.height);

    // draw line
    this.cx.beginPath();
    this.robotPositions.forEach(position => {
      this.cx.lineTo(position.x, position.y);
    });
    this.cx.strokeStyle = "red";
    this.cx.stroke();

    const lastPosition = this.robotPositions[this.robotPositions.length - 1];

    // draw icon
    this.cx.beginPath();
    this.cx.arc(lastPosition.x, lastPosition.y, 5, 0, 2 * Math.PI);
    this.cx.fillStyle = 'blue';
    this.cx.fill();
  }
}



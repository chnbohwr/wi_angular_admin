import { RobotHttpService } from './robot-http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-robot-http',
  templateUrl: './robot-http.component.html',
  providers: [RobotHttpService]
})
export class RobotHttp implements OnInit {
  constructor(private robotService: RobotHttpService) { }
  ngOnInit() {
    console.log(this.robotService);
  }
}

import { RobotHttpService } from './robot-http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-robot-http',
  templateUrl: './robot-http.component.html',
  providers: [RobotHttpService]
})
export class RobotHttp implements OnInit {
  private posts = [];
  constructor(private robotService: RobotHttpService) { }
  httpError(e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }
  ngOnInit() {

    this.robotService.getFullPost()
      .subscribe(data => {
        // this.posts = data;
        console.log('============sucess!!================');
        console.log(data);
        console.log('====================================');
      }, this.httpError);
  }
}

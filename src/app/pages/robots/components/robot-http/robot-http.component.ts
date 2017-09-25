import { RobotHttpService } from './robot-http.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/concat';
@Component({
  selector: 'app-robot-http',
  templateUrl: './robot-http.component.html',
  providers: [RobotHttpService]
})
export class RobotHttp implements OnInit {
  private posts = [];
  private sockets = [];
  constructor(private robotService: RobotHttpService) { }
  httpError(e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }
  ngOnInit() {

    // this.robotService.getFullPost()
    //   .subscribe(data => {
    //     // this.posts = data;
    //     console.log('============sucess!!================');
    //     console.log(data);
    //     this.posts = data;
    //     console.log('====================================');
    //   }, this.httpError);

    // const sendChannel = this.robotService.socket.send()

    // this.robotService.subscribeChannel().subscribe((q) => {
    //   console.log('success send data,', q);
    // });

    this.robotService.getDataStream()
      .subscribe(msg => {
        this.sockets.unshift(msg.data);
      }, this.httpError);

    this.robotService.socket.onOpen(() => {
      this.robotService.subscribeChannel().concat(this.robotService.showData(true)).subscribe();
    });
  }
}

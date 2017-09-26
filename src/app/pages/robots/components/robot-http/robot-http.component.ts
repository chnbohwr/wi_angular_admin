import { Observable } from 'rxjs/Rx';
import { RobotHttpService } from './robot-http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-robot-http',
  templateUrl: './robot-http.component.html',
  providers: [RobotHttpService]
})
export class RobotHttp implements OnInit, OnDestroy {
  public posts = [];
  public sockets = [];
  private dataStream$;
  private sendStream$;
  constructor(private robotService: RobotHttpService) { }
  httpError(e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }
  ngOnInit() {
    this.dataStream$ = this.robotService.getDataStream()
      .subscribe(msg => {
        this.sockets.unshift(msg.data);
        this.sockets = this.sockets.slice(0,20);
      }, this.httpError);

    this.robotService.socket.onOpen(() => {
      this.sendStream$ = this.robotService.subscribeChannel()
        .concat(this.robotService.test())
        .subscribe();
      console.log(this.sendStream$);
    });
  }

  ngOnDestroy() {
    console.log('destroy');
    this.dataStream$.complete();
    this.sendStream$.complete();
  }
}

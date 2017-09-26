import { $WebSocket, WebSocketConfig, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import { BaScrollPosition } from './../../../../theme/directives/baScrollPosition/baScrollPosition.directive';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Post {
  id: number;
  title: string;
  author: string;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
}

interface FullPost {
  id: number;
  title: string;
  author: string;
  comments: Comment[];
}

@Injectable()
export class RobotHttpService {
  public name: string = 'hyman';
  private baseurl = 'http://localhost:3000/';
  private baseSocketUrl = 'ws://192.168.21.240:30018/cable';
  private restfulUrl = 'http://192.168.21.240:30014/welcome/say_hello';
  private websocketSetting: WebSocketConfig = {
    initialTimeout: 500,
    maxTimeout: 300000,
    reconnectIfNotNormalClose: true,
  };
  public socket = new $WebSocket(this.baseSocketUrl, null, this.websocketSetting);
  constructor(private http: Http) {
    console.log(this);
  }
  getPollingData(duration: number = 2000): Observable<any> {
    const request = () => this.http.get(this.restfulUrl)
      .map((response: Response) => response.json())
      .catch((e: any) => Observable.throw(e));

    return Observable
      .interval(duration)
      .switchMap(request);
  }

  getComment(postId: number): Observable<Comment[]> {
    return this.http.get(`${this.baseurl}/comments?postId=${postId}`)
      .map((response: Response) => response.json())
      .catch((e: any) => Observable.throw(e));
  }

  getPosts(): Observable<Post[]> {
    return this.http.get(`${this.baseurl}/posts`)
      .map((response: Response) => response.json())
      .catch((e: any) => Observable.throw(e));
  }

  getFullPost(): Observable<FullPost[]> {
    return this.getPosts()
      .concatMap(posts => Observable.from(posts))
      .mergeMap(post => this.getComment(post.id), (post, comments) => ({ ...post, comments }))
      .toArray()
      .catch((e: any) => Observable.throw(e));
  }

  subscribeChannel(): Observable<any> {
    const sendData = {
      command: 'subscribe',
      identifier: JSON.stringify({ channel: 'RobotsChannel', roomId: 'Andy' })
    };
    return this.socket
      .send4Observable(JSON.stringify(sendData))
      .do(qq => { console.log('subscribe channel', qq); })
      .catch((e: any) => Observable.throw(e));
  }

  showData(isShowData: boolean): Observable<any> {
    const data = {
      command: 'message',
      identifier: JSON.stringify({ channel: 'RobotsChannel', roomId: 'Andy' }),
      data: JSON.stringify({ action: `${isShowData ? 'show' : 'stop'}`, roomId: 'Andy', message: '' })
    };
    return this.socket
      .send4Observable(JSON.stringify(data))
      .catch((e: any) => Observable.throw(e));
  }

  test() {
    return Observable.interval(1).map(() => this.showData(true));
  }

  getDataStream() {
    return this.socket
      .getDataStream()
      .map(event => {
        return { ...event, data: JSON.parse(event.data) };
      })
      .filter(event => (event.data.type !== 'ping'));
    // return this.socket.getDataStream();
  }
}

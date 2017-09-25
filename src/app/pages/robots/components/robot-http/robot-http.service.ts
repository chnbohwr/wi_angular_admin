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
  private baseSocketUrl = 'ws://192.168.17.76:3000/cable';
  private websocketSetting: WebSocketConfig = {
    initialTimeout: 500,
    maxTimeout: 300000,
    reconnectIfNotNormalClose: true,
  };
  public socket = new $WebSocket(this.baseSocketUrl, null, this.websocketSetting);
  constructor(private http: Http) {
    console.log(this);
  }
  getComment(postId: number): Observable<Comment[]> {
    return this.http.get(`${this.baseurl}/comments?postId=${postId}`)
      .map((res: Response) => res.json())
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
      identifier: JSON.stringify({ channel: 'RobotsChannel' })
    };
    return this.socket
      .send4Observable(JSON.stringify(sendData))
      .do(qq => { console.log('subscribe channel', qq); })
      .catch((e: any) => Observable.throw(e));
  }

  showData(isShowData: boolean): Observable<any> {
    const data = {
      command: 'message',
      identifier: JSON.stringify({ channel: 'RobotsChannel' }),
      data: JSON.stringify({ message: `${isShowData ? 'start' : 'stop'}`, action: 'show' })
    };
    return this.socket
      .send4Observable(JSON.stringify(data))
      .do(qq => { console.log('showdata', qq); })
      .catch((e: any) => Observable.throw(e));
  }

  getDataStream() {
    return this.socket
      .getDataStream()
      .map(event => {
        return { ...event, data: JSON.parse(event.data) };
      }).filter(event => (event.data.type !== 'ping'));
    // return this.socket.getDataStream();
  }
}

import { BaScrollPosition } from './../../../../theme/directives/baScrollPosition/baScrollPosition.directive';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/from';


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
  private baseurl = 'http://localhost:3000';
  constructor(private http: Http) { }
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
}

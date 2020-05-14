import { Component } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient){}

  posts: Post[] = [];

  title = 'httpdemo';

  onFetchPosts() {
    // Send Http request
    let params = new HttpParams();
    params = params.append("AAA", "BBB");
    params = params.append("CCC", "DDD");
    params = params.append("EEE", "FFF");

    this.http.get<Post[]>("https://fir-fca6c.firebaseio.com/post.json",
    {
      params: params
    }
    ).pipe(
      map(responseData => {
        const portArray: Post[] = [];
        for(const key in responseData){
          portArray.push({ ...responseData[key], id: key});
        }
        return portArray;
      })
    ).subscribe(
      posts => {
        console.log(posts);
        this.posts = posts;
      }, error => {
        console.log(error);
      }
    )
  }

  onClearPosts() {
    // Send Http 
    this.http.delete("https://fir-fca6c.firebaseio.com/post.json").subscribe(
      posts => {
        console.log("Post"+posts);        
      }, error => {
        console.log("Error: "+error);
      }
    )
  }

  onCreatePost(post: NgForm) {
    // Send Http request
    let headers = new HttpHeaders();
    headers = headers.append("New-Header1", "AAA_BB_CC");
    headers = headers.append("New-Header2", "AAA_BB_DD");
    headers = headers.append("New-Header3", "AAA_BB_EE");

    console.log(post.value);
    
    this.http.post("https://fir-fca6c.firebaseio.com/post.json", post.value,
    {
      headers: headers,
      observe: "events"
    }
    ).subscribe(
      responseData => {
        console.log(responseData);
        post.reset();
      }
    )
    
  }
}

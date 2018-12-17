import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {}

    getPosts() {
        return this.http.get('http://localhost:3000/posts');
    }

    createPost(post) {
        return this.http.post('http://localhost:3000/posts', post);
    }

    updatePost(post) {
        return this.http.put(`http://localhost:3000/posts/${post.id}`, post);
    }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostsService } from './../../posts.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
    articleForm = new FormGroup({
        id: new FormControl(''),
        title: new FormControl(''),
        description: new FormControl(''),
    });
    posts$: Observable<object>;
    @Output() displayForm = new EventEmitter();


    constructor(private postsService: PostsService, private store: Store<any>) {
        this.posts$ = this.store.pipe(select('posts'));
    }

    ngOnInit() {
        this.store.select('posts').subscribe(posts => {
            if(posts.currentPost) {
                this.articleForm = new FormGroup({
                    id: new FormControl(posts.currentPost.id),
                    title: new FormControl(posts.currentPost.title),
                    description: new FormControl(posts.currentPost.description),
                });
            }
        });
    }

    resetForm(event: any) {
        event.preventDefault();
        this.articleForm.reset();
    }

    onSubmit() {
        if(this.articleForm.value.id) {
            this.postsService.updatePost({
                id: this.articleForm.value.id,
                title: this.articleForm.value.title,
                description: this.articleForm.value.description
            }).subscribe(post => {
                this.store.dispatch({type: 'UPDATE_POST', payload: post});
                this.displayForm.emit(false);
                this.articleForm.reset();
            });

            return;
        }

        this.postsService.createPost({
            title: this.articleForm.value.title,
            description: this.articleForm.value.description
        }).subscribe(post => {
            this.store.dispatch({type: 'ADD_POST', payload: post});
            this.displayForm.emit(false);
            this.articleForm.reset();
        });
    }
}

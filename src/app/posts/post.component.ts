import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    posts$: Observable<object>;
    displayArticle: boolean = false;
    displayForm: boolean = false;
    displayDetail: boolean = false;

    constructor(private store: Store<any>) {
        this.posts$ = this.store.pipe(select('posts'));
    }

    ngOnInit() {
        this.store.dispatch({type: 'FETCH_POSTS'});
    }

    show(post) {
        this.store.dispatch({type: 'SHOW_POST', payload: post});
        this.displayDetail = true;
    }

    toggleForm() {
        this.displayForm = !this.displayForm;
    }

    hideForm(){
        this.displayForm = false
    }

    edit(post) {
        this.store.dispatch({type: 'SHOW_POST', payload: post});
        this.displayForm = true
    }
}

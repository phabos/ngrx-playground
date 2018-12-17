import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
    posts$: Observable<object>;

    constructor(private store: Store<any>) {
        this.posts$ = this.store.pipe(select('posts'));
    }

    ngOnInit() {}
}

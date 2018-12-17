import { Injectable } from '@angular/core';
import { PostsService } from './posts.service';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class PostsEffects {
    // Listen for the 'FETCH_POSTS' action
    @Effect()
    getPosts$: Observable<Action> = this.actions$.pipe(
        ofType('FETCH_POSTS'),
        mergeMap(() =>
            this.postsService.getPosts().pipe(
                // If successful, dispatch success action with result
                map(data => ({ type: 'GET_POSTS', payload: data })),
                // If request fails, dispatch failed action
                catchError(() => of({ type: 'GET_POSTS_FAILED' }))
            )
        )
    );

    constructor(private postsService: PostsService, private actions$: Actions) {}
}
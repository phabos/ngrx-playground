export function postsReducer(state = { currentPost: null, posts: []}, action) {
    switch (action.type) {
        case 'GET_POSTS':
            return { currentPost: null, posts: action.payload };
        case 'ADD_POST':
            return { currentPost: null, posts: [...state.posts, action.payload] };
        case 'SHOW_POST':
            return { currentPost: action.payload, posts: state.posts };
        case 'UPDATE_POST':
            let newPosts = state.posts.map(post => post.id == action.payload.id ? action.payload : post );
            return { currentPost: null, posts: newPosts };
        default:
            return state;
    }
}

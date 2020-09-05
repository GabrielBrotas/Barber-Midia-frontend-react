import {GET_POSTS_ERROR, LOADING_DATA, GET_POSTS_SUCCESS, LIKE_POST, UNLIKE_POST, DELETE_POST, PUBLISH_POST, GET_POST_SUCCESS, SUBMIT_COMMENT, GET_PLACES, GET_ALL_COMMENTS, DELETE_COMMENT} from '../types'

const initialState = {
    loading: false,
    posts: [],
    post: {},
    places: [],
    place: {},
    comments: [],
    error: null
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {...state, loading: true};

        case GET_PLACES:
            return {...state, places: action.payload, loading: false};

        case GET_POSTS_SUCCESS:
            return {...state, posts: action.payload, loading: false};
        
        case GET_POSTS_ERROR:
            return {...state, error: true, loading: false}

        case GET_POST_SUCCESS:
            return {...state, post: action.payload}
            
        case GET_ALL_COMMENTS:
            return {...state, comments: action.payload, loading: false}
            
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex((post) => post.postId === action.payload.postId);
            state.posts[index] = action.payload;

            // atualizar a qtd de like da post unica 
            if(state.post.postId === action.payload.postId) {
                state.post.likeCount = action.payload.likeCount
            }
            return {...state}
            
        case DELETE_POST:
            let indexToDeletePost = state.posts.findIndex( post => post.postId === action.payload);
            state.posts.splice(indexToDeletePost, 1)
            return {...state}
        
        case PUBLISH_POST:
            return {...state, posts: [action.payload, ...state.posts], post: {...action.payload}}
            
        case SUBMIT_COMMENT:
            return {...state, comments: [action.payload, ...state.comments]}
        
        case DELETE_COMMENT:
            let indexToDeleteComment = state.comments.findIndex( comment => comment.commentId === action.payload);
            state.comments.splice(indexToDeleteComment, 1)
            return {...state}

        default:
            return state

    }
}
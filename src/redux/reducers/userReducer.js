import { SET_USER, GET_USERS, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST, MARK_NOTIFICATIONS_READ} from '../types'

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
    users: []
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_USERS:
            return {...state, loading: false, users: action.payload}

        case SET_AUTHENTICATED:
            return {...state, authenticated: true};
        
        case SET_UNAUTHENTICATED:
            return initialState;
        
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                loading: false,
                ...action.payload
            }

        case LOADING_USER:
            return {
                ...state, loading: true
            }
        case LIKE_POST:

            return {...state, 
                likes: [
                ...state.likes, {userHandle: state.credentials.handle, postId: action.payload.postId}
            ]}
        case UNLIKE_POST:
            return {...state, likes: state.likes.filter( like => like.postId !== action.payload.postId)}

        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach( notification => notification.read = true)
            return {...state}
        default:
            return state

    }
}
import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, UPLOADING_PROGRESS} from '../types'

const initialState = {
    loading: false,
    errors: null,
    progress: 0
}

export default function(state = initialState, action){
    switch(action.type) {
        
        case SET_ERRORS:
            return {
                ...state,
                loading:false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null,
                progress: 0
            }
        case LOADING_UI: 
            return {
                ...state, 
                loading: true
            }
        case UPLOADING_PROGRESS: 
            return {...state, progress: action.payload}
            
        case STOP_LOADING_UI:
            return {...state, loading: false, progress: 0}
        default:
            return state
    }
}
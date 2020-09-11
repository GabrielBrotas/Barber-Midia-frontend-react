import {START_CHAT, SEND_MESSAGE, GET_CHAT, LOADING_CHAT} from '../types'

const initialState = {
    loading: false,
    chats: [],
    chat: {},
    error: null
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_CHAT: 
            return {...state, loading: true}
        case START_CHAT:
            return {...state, chat: action.payload, loading: false}
        case GET_CHAT: 
            return {...state, chat: action.payload, loading: false}
        case SEND_MESSAGE:
            return {...state, chat: {chatId: action.payload.chatId,messages: [...state.chat.message, action.payload.message]}, loading: false}
        default:
        return state

    }
}
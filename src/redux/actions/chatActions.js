import axios from 'axios'
import {START_CHAT, SEND_MESSAGE, GET_CHAT, GET_CHATS, LOADING_CHAT} from '../types'

export const startChat = (userTwoId, history) => (dispatch) => {
    
    dispatch({type: LOADING_CHAT})
    axios.post('/chat', {userTwoId})
    .then( res => {
        dispatch({type: START_CHAT, payload: res.data})
        history.push('/chat/' + res.data.chatId)
    })
    .catch( err => {
        console.log(err)
    })
}

export const getUserChats = () => (dispatch) => {

    dispatch({type: LOADING_CHAT})
    axios.get('/chat')
        .then( res => {
            dispatch({type: GET_CHATS, payload: res.data})
        })
        .catch( err => console.log(err))
}

export const getChat = (chatId) => (dispatch) => {

    dispatch({type: LOADING_CHAT})
    // axios.get('/chat/')
}

export const sendMessage = (roomId) => (dispatch) => {

}
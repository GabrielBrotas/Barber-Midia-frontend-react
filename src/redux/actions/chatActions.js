import axios from 'axios'
import {START_CHAT, SEND_MESSAGE, GET_CHAT, LOADING_CHAT} from '../types'

export const startChat = (userTwoId, history) => (dispatch) => {
    
    dispatch({type: LOADING_CHAT})
    axios.post('/chat', {userTwoId})
    .then( res => {
        console.log(res.data)
        dispatch({type: START_CHAT, payload: res.data})
        history.push('/chat/' + res.data.chatId)
    })
    .catch( err => {
        console.log(err)
    })
}
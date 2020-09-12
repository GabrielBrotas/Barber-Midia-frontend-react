import React, {useState, useEffect} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {getChat} from '../redux/actions/chatActions'

import Grid from '@material-ui/core/Grid'

import Sidebar from '../components/Chat/Sidebar'
import ChatForm from '../components/Chat/ChatForm'

export default function Chat(props) {
    const dispatch = useDispatch();

    const chatInfo = useSelector(state => state.chat)
    const {loading, chat} = chatInfo

    const [chatId, setChatId] = useState(null)

    useEffect( () => {
        setChatId(props.match.params.chatId)

        return () => {
            setChatId(null)
        }
    }, [props.match])

    useEffect( () => {
        if(chatId) {
            dispatch(getChat(chatId))
        }
    }, [chatId, dispatch])

    return (
    <Grid container spacing={3}>
            
        <Grid item sm={4} xs={12}>
            <Sidebar chatId={chatId}/>
        </Grid>

        <Grid item sm={8} xs={12} style={{height: '90vh'}}>
            {chatId && !loading && <ChatForm chat={chat} />}
        </Grid>  
        
    </Grid> 
    
)}

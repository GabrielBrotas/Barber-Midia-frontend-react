import React, {useState, useEffect} from 'react'
import db from '../utils/firebase'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {getChat} from '../redux/actions/chatActions'

// MUI
import Grid from '@material-ui/core/Grid'

import Sidebar from '../components/Chat/Sidebar'
import ChatForm from '../components/Chat/ChatForm'

export default function Chat(props) {
    const dispatch = useDispatch();

    const usersInfo = useSelector(state => state.user)
    const {credentials: {userId}} = usersInfo

    const [chatId, setChatId] = useState(null)
    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])

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

    useEffect( () => {
        db.collection('chats').onSnapshot( snapshot => {
            setChats( snapshot.docs.map( doc => (
                {
                chatId: doc.id,
                userOneId: doc.data().userOneId,
                userTwoId: doc.data().userTwoId
                }
            )))
        })
        return 
    }, [])

    useEffect( () => {
        if(chatId) {
            db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot( snapshot => {
                setMessages( snapshot.docs.map( doc => doc.data()))
            }); 
        }
        return 
    }, [chatId])

    return (
    <Grid container spacing={3}>
            
        <Grid item sm={4} xs={12}>
            <Sidebar chats={chats} />
        </Grid>

        <Grid item sm={8} xs={12} style={{height: '90vh'}}>
            {chatId && <ChatForm messages={messages} userId={userId} chatId={chatId} />}
        </Grid>  
        
    </Grid> 
    
)}

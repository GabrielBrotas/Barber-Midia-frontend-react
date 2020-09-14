import React, {useState, useEffect} from 'react'
import db from '../utils/firebase'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {getChat} from '../redux/actions/chatActions'

// MUI
import Grid from '@material-ui/core/Grid'

import Sidebar from '../components/chat/Sidebar'
import ChatForm from '../components/chat/ChatForm'

export default function Chat(props) {
    const dispatch = useDispatch();

    const usersInfo = useSelector(state => state.user)
    const {users, credentials: {userId}} = usersInfo

    const [chatId, setChatId] = useState(null)
    const [chats, setChats] = useState([])
    const [userReceive, setUserReceive] = useState(null)
    const [messages, setMessages] = useState([])
    const [latestMessages, setLatestMessages] = useState([])

    useEffect( () => {
        if(chatId) {
            dispatch(getChat(chatId))
        }
    }, [chatId, dispatch])

    useEffect( () => {
        setChatId(props.match.params.chatId)

        return () => {
            setChatId(null)
        }
    }, [props.match])

    useEffect( () => {
        db.collection('chats')
            .orderBy('updatedAt', 'desc')    
            .onSnapshot( snapshot => {
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

    useEffect( () => {
        chats.forEach( chat => {
            if(chat.chatId === chatId) {
                users.forEach( user => {
                    if(chat.userOneId === user.userId || chat.userTwoId === user.userId){
                        user.userId !== userId && setUserReceive(user)
                    }
                })
            }
        })
    }, [chatId, userId, users, chats])

    useEffect( () => {
        if(chats.length > 0) {

            setLatestMessages( chats.forEach( chat => {
                db.collection('chats')
                .doc(chat.chatId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot( snapshot => {
                    snapshot.docs.map( (doc, index) => index === snapshot.docs.length - 1 && (chat.userOneId === userId || chat.userTwoId === userId) &&
                     setLatestMessages( latestMessages.push({
                        chatId: chat.chatId,
                        latestMessage: doc.data().message
                    })))
                })
            }))

        }
        return 
    }, [chats, userId])

    return (
    <Grid container spacing={3}>
            
        <Grid item sm={4} xs={12}>
            <Sidebar chats={chats} chatId={chatId} latestMessages={latestMessages} />
        </Grid>

        <Grid item sm={8} xs={12} style={{height: '90vh'}}>
            {chatId && <ChatForm messages={messages} userId={userId} chatId={chatId} userReceive={userReceive} />}
        </Grid>  
        
    </Grid> 
    
)}

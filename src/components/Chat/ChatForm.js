import React, {useState} from 'react'

import {useDispatch} from 'react-redux'
import {sendMessage} from '../../redux/actions/chatActions'

import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles( theme => ({
    chat: {
        flex: 0.65,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    chatHeader: {
        display: 'flex',
        padding: 20,
        alignItems: 'center',
        borderBottom: '1px solid lightgray',
        color: theme.fontMainColor
    },
    chatHeaderInfo: {
        flex: 1,
        paddingLeft: 20,
        "& h3": {
            marginBottom: 3,
            fontWeight: '500'
        }
    },
    chatBody: {
        flex: 1,
        backgroundColor: "#dcdcdc0f",
        overflowY: 'scroll',
        padding: 30
    },
    chatMessageReceive: {
        position: 'relative',
        fontSize: 16,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        width: "fit-content",
        marginBottom: 30
    },
    chatMessageSender: {
        position: 'relative',
        fontSize: 16,
        padding: 10,
        backgroundColor: "#DCF8C6",
        borderRadius: 10,
        width: "fit-content",
        marginBottom: 30,
        marginLeft: 'auto'
    },
    chatFooter: {
        color: theme.fontMainColor,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 62,
        borderTop: '1px solid lightgray',
        "& form": {
            flex: 1,
            display: 'flex',
        },
        "& form input": {
            flex: 1,
            borderRadius: 30,
            padding: 10,
            border: 'none'
        },
        "& form button": {
            display: 'none',
        }
    },
    inputIcon: {
        margin: '0 10px'
    }
}))

function Chat({messages, userId, chatId, userReceive}) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [input, setInput] = useState('')


    const submitHandle = (e) => {
        e.preventDefault()
        if(input){
            dispatch(sendMessage(chatId, input))
        }
        setInput('')
    }

    return (
        <div className={classes.chat}>
            <div className={classes.chatHeader}>
                {userReceive ? (
                    <>
                    <Avatar src={userReceive.imageUrl} />
                    <div className={classes.chatHeaderInfo}>
                        <h3>{userReceive.handle}</h3>
                        <p>Last seen at ...</p>
                    </div>
                    </>
                ): (
                    <p>loading...</p>
                )}
                
            </div>
            
            <div className={classes.chatBody}>
                {messages.map( (message, index) => (
                    <p key={index} className={ message.userId === userId ? classes.chatMessageSender : classes.chatMessageReceive}>
                        {message.message}
                    </p>
                ))}

            </div>
            <div className={classes.chatFooter}>
                <InsertEmoticonIcon className={classes.inputIcon} />
                <form>
                    <input value={input} onChange={ e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button type="submit" onClick={submitHandle}>Send a message</button>
                </form>
                <SendIcon className={classes.inputIcon} />
            </div>
        </div>
    )
}

export default Chat

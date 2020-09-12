import React, {useState} from 'react'

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
        borderBottom: '1px solid lightgray'
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
        backgroundColor: '#f332',
        overflowY: 'scroll',
        padding: 30
    },
    chatMessage: {
        position: 'relative',
        fontSize: 16,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        width: "fit-content",
        marginBottom: 30
    },
    chatReciever: {
        position: 'relative',
        fontSize: 16,
        padding: 10,
        borderRadius: 10,
        width: "fit-content",
        marginBottom: 30,
        marginLeft: 'auto',
        backgroundColor: "#dcf8c6"
    },
    chatFooter: {
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
    }
}))

function Chat(props) {
    const classes = useStyles();

    const [input, setInput] = useState('')
    const {chat} = props

    const sendMessage = (e) => {
        e.preventDefault()
        console.log(input)
        setInput('')
    }
    
    return (
        <div className={classes.chat}>
            <div className={classes.chatHeader}>
                <Avatar src="https://avatars.dicebear.com/api/human/dog.svg"/>
                <div className={classes.chatHeaderInfo}>
                    <h3>Room name</h3>
                    <p>Last seen at ...</p>
                </div>
            </div>
            
            <div className={classes.chatBody}>
                {chat.messages && chat.messages.map( message => (
                    <p className={classes.chatMessage}>
                        {message.message}
                    </p>
                ))}

            </div>
            <div className={classes.chatFooter}>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={ e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <SendIcon />
            </div>
        </div>
    )
}

export default Chat

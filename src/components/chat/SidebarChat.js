import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles( theme => ({
    chat: {
        display: 'flex',
        padding: '20px 10px',
        cursor: 'pointer',
        borderBottom: '1px solid #f6f6f6',
        "&:hover": {
            background: theme.mainColor
        }
    },
    activeChat: {
        display: 'flex',
        padding: '20px 10px',
        cursor: 'pointer',
        borderBottom: '1px solid #f6f6f6',
        background: theme.mainColor
    },
    sidebarChatInfo: {
        marginLeft: 15,
        color: theme.fontMainColor,
        "& h2": {
            fontSize: 16,
            marginBottom: 8
        }
    },
    chatContent: {
        display: 'flex',
    }
}))

function SidebarChat({chat, activeChat, latestMessages}) {
    const classes = useStyles();

    const usersInfo = useSelector(state => state.user)
    const {users, loading, credentials: {handle, userId}} = usersInfo

    const [userReceive, setUserReceive] = useState(null)
  
    useEffect( () => {
        setUserReceive( chat.userOneId === userId ? chat.userTwoId : chat.userOneId)
    }, [chat, handle, userId])

    console.log(latestMessages)
    return (
        !loading ? (
        <div className={activeChat ? classes.activeChat : classes.chat}>

            {users.map( user => (
                user.userId === userReceive && 
                <div key={user.userId} className={classes.chatContent}>
                    <Avatar src={user.imageUrl}/>
                    <div className={classes.sidebarChatInfo}>
                        <h2>{user.handle}</h2>
                        {/* {latestMessages && latestMessages.map( message => (
                            message.chatId === chat.chatId && <p key={message.chatId}>{message.latestMessage}</p>
                        ))} */}
                    </div>
                </div>
            ))}
  
        </div>
        ) : (
            <p>loading...</p>
        )
    )
}

export default SidebarChat

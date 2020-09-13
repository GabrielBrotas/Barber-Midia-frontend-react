import React, {useState, useEffect, Fragment} from 'react'
import {useSelector} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles( theme => ({
    sidebarChat: {
        display: 'flex',
        padding: '20px 0px',
        cursor: 'pointer',
        borderBottom: '1px solid #f6f6f6',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        "&:hover": {
            background: "#ebebeb"
        }
    },
    sidebarChatInfo: {
        marginLeft: 15,
        "& h2": {
            fontSize: 16,
            marginBottom: 8
        }
    }
}))

function SidebarChat({chat}) {
    const classes = useStyles();

    const usersInfo = useSelector(state => state.user)
    const {users, loading, credentials: {handle, userId}} = usersInfo

    const [userReceive, setUserReceive] = useState(null)
  
    useEffect( () => {
        setUserReceive( chat.userOneId === userId ? chat.userTwoId : chat.userOneId)
    }, [chat, handle, userId])
 
    return (
        !loading ? (
        <div className={classes.sidebarChat}>

            {users.map( user => (
                user.userId === userReceive && 
                <Fragment key={user.userId}>
                    <Avatar src={user.imageUrl}/>
                    <div className={classes.sidebarChatInfo}>
                    <h2>{user.handle}</h2>
                    <p>Last Message</p>
                </div>
                </Fragment>
            ))}
  
        </div>
        ) : (
            <p>loading...</p>
        )
    )
}

export default SidebarChat

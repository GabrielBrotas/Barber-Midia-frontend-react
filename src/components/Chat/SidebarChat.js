import React from 'react'

import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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

function SidebarChat() {
    const classes = useStyles();

    return (
        <div className={classes.sidebarChat}>
            <Avatar src="https://avatars.dicebear.com/api/human/dog.svg"/>
            <div className={classes.sidebarChatInfo}>
                <h2>Room Name</h2>
                <p>Last Message</p>
            </div>
        </div>
    )
}

export default SidebarChat

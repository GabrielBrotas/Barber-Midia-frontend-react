import React from 'react'
import {Link} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ChatIcon from '@material-ui/icons/Chat'

const useStyles = makeStyles((theme) => ({
    spanText: { 
        marginRight: '.5rem',
        "@media only screen and (min-width: 960px)": {
            display: 'none'
        }
    },

}))

export default function ChatButton({iconColor, closeMenu}) {
    const classes = useStyles();

    return (
        <Link to="/chat" onClick={closeMenu}>
            <IconButton
            edge="end"
            aria-label="caixa de entrada"
            aria-haspopup="true"
            style={{color: iconColor}}
            >
                <Tooltip placement="top" title="caixa de entrada">
                    <ChatIcon />
                </Tooltip>
            </IconButton>
            <span className={classes.spanText}>Caixa de entrada</span>
        </Link>
    )
}

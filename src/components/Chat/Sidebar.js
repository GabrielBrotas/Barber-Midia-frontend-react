import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserChats} from '../../redux/actions/chatActions'

// component
import SidebarChat from './SidebarChat'

// MUI
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const useStyles = makeStyles( theme => ({
    sidebar:{
        display: 'flex',
        flexDirection: 'column',
        flex: 0.35,
        height: '-webkit-fill-available;'
    },
    sidebarHeader: {
        textAlign: 'center',
        padding: 20,
        borderRight: '1px solid lightgray',
        color: theme.mainColor,
        fontWeight: 600
    },
    sidebarSearchContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        contain: 'content',
        width: '100%',
        height: 35,
        borderRadius: 20,
    },
    sidebarSearch: {
        display: "flex",
        contain: 'content',
        alignItems: 'center',
        backgroundColor: theme.backgroundColorSecondary,
        height: 39,
        padding: 10,

        "& input": {
            border: 'none',
            marginLeft: 10,
            width: '100%',
            height: '100%'
        }
    },
    sidebarChats: {
        flex: 1,
        borderRadius: 15,
        marginTop: 10,
        backgroundColor: '#5f5b4621',
        paddingBottom: 5
    }
}))

function Sidebar() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const chatInfo = useSelector(state => state.chat)
    const {chats, loading} = chatInfo

    useEffect( () => {
        dispatch(getUserChats())
    }, [dispatch])

    return (
        !loading ? (
        <div className={classes.sidebar}>
            <Typography className={classes.sidebarHeader} variant="h5">
                Caixa de Entrada
            </Typography>  

            <div className={classes.sidebarSearch}>
                <div className={classes.sidebarSearchContainer}>
                    <SearchOutlinedIcon />
                    <input placeholder="Search for conversations" type="text" />
                    </div>
            </div>

            <div className={classes.sidebarChats}>
                {
                chats.map( chat => (
                    <SidebarChat key={chat.chatId} chat={chat} />
                ))
                }
            </div>
        </div>
        ) : (
            <p>loading...</p>
        )
    )
}

export default Sidebar

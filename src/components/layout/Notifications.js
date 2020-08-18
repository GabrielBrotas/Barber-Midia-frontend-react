import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs' // vamos usar ela para formatar o tempo do post
import relativeTime from 'dayjs/plugin/relativeTime' //2days ago.., 2 hours agor...


// MUI Stuffs
import withStyles from '@material-ui/core/styles/withStyles'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {markNotificationsRead} from '../../redux/actions/userActions'

const styles = {
    NotificationStyle: {
        color: "#fff"
    }
}

function Notifications(props) {

    const userInfo = useSelector(state => state.user)
    const {notifications} = userInfo
    const {classes} = props
    const [anchorEl, setAnchorEl] = useState(null)

    const dispatch = useDispatch()

    // mostrar o menu dropdown
    const handleOpen = (e) => {
        setAnchorEl(e.target)
    }

    // fechar o menu
    const handleClose = () => {
        setAnchorEl(null)
    }

    // quando abrir o menu..
    const onMenuOpened = () => {
        // pegar o id das notificações nao lidas
        let unreadNotificationsIds = notifications
            // filtrar as que nao estao lidas
            .filter(not => !not.read)
            // e retornar o id delas
            .map(not => not.notificationId)

        // disparar ação para marcar as notificações como lidas
        dispatch(markNotificationsRead(unreadNotificationsIds))
    }


    dayjs.extend(relativeTime)

    let notificationsIcon;

    // se tiver notificações e for maior que 0
    if(notifications && notifications.length > 0) {

        notifications.filter(notification => notification.read === false).length > 0 
            // filtrar as notificaçoes que nao estao lidas
            ? notificationsIcon = (
                // quantidade das notificações, gera um pequeno emblema no canto superior direito de seu(s) filho(s). ex: 6
            <Badge badgeContent={notifications.filter( not => not.read === false).length} color="secondary">
                <NotificationsIcon className={classes.NotificationStyle} />
            </Badge>
        ) : (
            // as notificações que estiverem lidas apenas retornar.
            notificationsIcon = <NotificationsIcon className={classes.NotificationStyle} />
        )
    } else {
        // Retornar as notificações antigas...
        notificationsIcon = <NotificationsIcon className={classes.NotificationStyle} />
    }

    // dropdown do menu
    let notificationsMarkup = 
        notifications && notifications.length > 0 ? (
            notifications.map( not => {
                // constants
                const verb = not.type === 'like' ? 'curtiu' : 'comentou na'
                const time = dayjs(not.createdAt).fromNow()
                const iconColor = not.read ? 'primary' : 'secondary'
                const icon = not.type === 'like' ? (
                    // se o tipo da notificação for 'like' mostrar o icone de coração
                    <FavoriteIcon color={iconColor} style={{marginRight: 10}} />
                ) : (
                    // se o tipo da notificação for de comentaio mostrar o icone do chat
                    <ChatIcon color={iconColor} style={{marginRight: 10}} />
                )

                return (
                    <MenuItem key={not.createdAt} onClick={handleClose}>
                        {icon}
                        <Typography component={Link} color="primary" variant="body1" to={`/users/${not.recipient}/scream/${not.screamId}`}>
                            {not.sender} {verb} sua publicação {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            // caso nao tenha notificações
            <MenuItem onClick={handleClose}>
                Você não tem notificações
            </MenuItem>
        )

    return(
        <Fragment>

            {/* icone da notificação */}
            <Tooltip placement="top" title="Notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={handleOpen}>
                    {notificationsIcon}
                </IconButton>
            </Tooltip>

            {/* menu dropdown */}
            <Menu 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleClose} 
            onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>

        </Fragment>
    )

    
}


export default withStyles(styles)(Notifications)
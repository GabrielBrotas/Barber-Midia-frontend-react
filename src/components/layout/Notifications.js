import React, {useState} from 'react'
import dayjs from 'dayjs' // vamos usar ela para formatar o tempo do post
import relativeTime from 'dayjs/plugin/relativeTime' //2days ago.., 2 hours agor...


// MUI Stuffs
import {makeStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

// icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {markNotificationsRead} from '../../redux/actions/userActions'

const useStyles = makeStyles((theme) => ({
    notificationText: {
        "@media only screen and (min-width: 960px)": {
            display: 'none'
        }
    }
}))


function Notifications(props) {
    const classes = useStyles();
    const userInfo = useSelector(state => state.user)
    const {notifications} = userInfo
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
                <NotificationsIcon  />
            </Badge>
        ) : (
            // as notificações que estiverem lidas apenas retornar.
            notificationsIcon = <NotificationsIcon  />
        )
    } else {
        // Retornar as notificações antigas...
        notificationsIcon = <NotificationsIcon style={{color: props.iconColor}} />
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
                        <Typography color="primary" variant="body1" >
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
        <div>

            <div onClick={handleOpen}>
                <Tooltip placement="top"  title="Notificações">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true">
                    {notificationsIcon}
                </IconButton>
                </Tooltip>
                <span className={classes.notificationText}>Notificações</span>
            </div>

            <Menu 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleClose} 
            onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>

        </div>
    )

    
}


export default Notifications
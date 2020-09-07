import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'
import {getAllUsers} from '../../redux/actions/userActions'

import { makeStyles } from '@material-ui/core/styles';
import MuiLink from '@material-ui/core/Link'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';;


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'transparent',
    position: 'absolute',
    textDecoration: "none",
    "& :hover":{
        textDecoration: "none",
    }
  },
  productList: {
    backgroundColor: theme.fontMainColor,
    "& :hover":{
        backgroundColor: "#ff2"
    }
  },
  muiLink: {
    "& :hover": {
        backgroundColor: "#e1e1e1",
    }
  },
  listItemText: {
    textDecoration: "none",
    "& span": {
        color: theme.backgroundColorMain,
        textDecoration: "none",
    },
    "& p": {
        color: "darkgray",
        textDecoration: "none",
    } 
  }
}));

export default function NavbarInputList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const usersInfo = useSelector(state => state.user)
    const {users, loading} = usersInfo

    const {inputBar, setInputBar} = props

    useEffect( () => {
        dispatch(getAllUsers())
    }, [dispatch])

    // mostrar li
    useEffect( () => {
        const searchBar = document.getElementById("productListContent").children
        Array.from(searchBar).forEach(item => (
            inputBar === "" ? (item.style = 'display: none') :
            item.textContent.toLowerCase().match(inputBar.toLowerCase()) ?
            (item.style = "display: flex") :
            (item.style = 'display: none') 
        ))
    }, [inputBar, users])

    return !loading && (
        <List dense className={classes.root} id="productListContent">
        {users.map( (user, index) => (
            user.type !== "Usuario" && index < 10 &&
            <MuiLink key={user.userId} component={Link} to={`/user/${user.handle}`} className={classes.muiLink} onClick={() => setInputBar("")} style={{textDecoration: "none"}}>
            <ListItem button className={classes.productList}>
                <ListItemAvatar>
                <Avatar
                    alt={`Avatar`}
                    src={user.imageUrl}
                />
                </ListItemAvatar>
                <ListItemText
                    className={classes.listItemText}
                    primary={user.handle}
                    secondary={
                        <React.Fragment>
                        {user.category}
                        </React.Fragment>
                    }
                    />
            </ListItem>
            </MuiLink>
        ))}
        </List>
    )
}


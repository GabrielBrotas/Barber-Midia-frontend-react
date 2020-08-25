import React, {useEffect, useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// Redux
import {useSelector, useDispatch} from 'react-redux'
import {getAllUsers} from '../redux/actions/userActions'
import {getPosts} from '../redux/actions/dataActions'

// MUI
import Grid from '@material-ui/core/Grid'

// components
import Profile from '../components/profile/Profile'
import Gallery from '../components/layout/Gallery'

const styles = {
    root:{
        "&.MuiPaper-root": {
            position: 'relative',
            width: "100%"
        }
    },
    GalleryContent:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }
}

function User(props) {

    const userInfo = useSelector(state => state.user)
    const {users, loading, authenticated, credentials: {handle}} = userInfo
    
    const postList = useSelector(state => state.data)
    const {posts, loading: postLoading} = postList

    const {classes} = props
    const userHandle = props.match.params.handle

    const [selectedUser, setSelectedUser] = useState([])
    const [userPosts, setUserPosts] = useState([])

    const dispatch = useDispatch() 

    useEffect( () => {
        dispatch(getAllUsers())
        dispatch(getPosts())
    }, [dispatch])

    useEffect( () => {
        users.forEach( user => {
            userHandle === user.handle
            && setSelectedUser(user)
        })
    }, [userHandle, users])

    useEffect( () => {
        !postLoading > 0 
        ? setUserPosts(
            <Gallery posts={posts} barber={userHandle} />
        )
        : setUserPosts(<p>loading</p>)
    }, [posts, userHandle, postLoading])

    return ( !loading && !postLoading ?
        (<Grid container spacing={3}>
            
            <Grid className={classes.profileColumn} item sm={4} xs={12}>
                <Profile authenticatedUser={handle} credentials={selectedUser} authenticated={authenticated}paperPosition="relative"/> 
            </Grid>
            <Grid item sm={8} xs={12}>
                {userPosts}
            </Grid>  
            
        </Grid>) : (
            <p>loading...</p>
        )
    )
}

export default withStyles(styles)(User)

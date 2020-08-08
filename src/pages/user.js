import React, {useEffect, useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// Redux
import {useSelector, useDispatch} from 'react-redux'
import {getAllUsers} from '../redux/actions/userActions'
import {getPosts} from '../redux/actions/dataActions'

// MUI
import Grid from '@material-ui/core/Grid'

// components
import Barber from '../components/profile/Barber'
import Gallery from '../components/layout/Gallery'

const styles = {
    GalleryContent:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
}

function User(props) {

    const usersList = useSelector(state => state.user)
    const {users, loading} = usersList
    
    const postList = useSelector(state => state.data)
    const {posts} = postList

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
        !posts.lenght > 0 ?
        setUserPosts(
            posts.map( (post) => (
                post.userHandle === userHandle && <Gallery key={post.postId} post={post} />
            )))
        : setUserPosts(<p>loading</p>)
    }, [posts, userHandle])

    return ( !loading ?
        (<Grid container spacing={4}>
            
            <Grid item sm={4} xs={12}>
                <Barber barber={selectedUser}/> 
            </Grid>

            <Grid item sm={8} xs={12} className={classes.GalleryContent}>
                {userPosts}
            </Grid>
            
        </Grid>) : (
            <p>loading...</p>
        )
    )
}

export default withStyles(styles)(User)

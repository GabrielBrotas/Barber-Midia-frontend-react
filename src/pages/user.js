import React, {useEffect, useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// Redux
import {useSelector, useDispatch} from 'react-redux'
import {getAllUsers} from '../redux/actions/userActions'
import {getPosts, getAllPlaces, getPlace} from '../redux/actions/dataActions'

// MUI
import Grid from '@material-ui/core/Grid'

// components
import Profile from '../components/Profile/Profile'
import ExtraDetails from '../components/Profile/ExtraDetails'
import Gallery from '../components/Layout/Gallery'
import ProfileSkeleton from '../components/Profile/ProfileSkeleton'
import GallerySkeleton from '../components/Layout/GallerySkeleton'


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

    const dataList = useSelector(state => state.data)
    const {posts, loading: postLoading, places} = dataList

    const {classes} = props
    const userHandle = props.match.params.handle

    const [selectedUser, setSelectedUser] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [placeId, setPlaceId] = useState(null)

    const dispatch = useDispatch() 

    useEffect( () => {
        dispatch(getAllUsers())
        dispatch(getPosts())
        dispatch(getAllPlaces())
    }, [dispatch])

    useEffect( () => {
        users.forEach( user => {
            userHandle === user.handle
            && setSelectedUser(user)
        })
        !postLoading > 0
        && setUserPosts(
            posts.filter( post => (
                post.userHandle === userHandle && post.bodyImage !== "" && post  
            )))
    }, [userHandle, users, posts, postLoading])

    useEffect( () => {
        places.forEach( place => {
            place.handle === userHandle && setPlaceId(place.placeId)
        })
    }, [places, userHandle])

    useEffect( () => {
        placeId &&
            dispatch(getPlace(placeId))
    }, [placeId, dispatch])

    return ( !loading && !postLoading ?
        (<Grid container spacing={3}>
            
            <Grid className={classes.profileColumn} item sm={5} xs={12}>
                <Profile authenticatedUser={handle} credentials={selectedUser} authenticated={authenticated}paperPosition="relative"/> 

                <ExtraDetails handle={handle} placeId={placeId} />
            </Grid>

            <Grid item sm={7} xs={12}>
            {!postLoading > 0 &&
                <Gallery userPosts={userPosts} />   
            }    
            </Grid>  
            
        </Grid>) : (
            <Grid container spacing={3}>
                <Grid className={classes.profileColumn} item sm={4} xs={12}>
                    <ProfileSkeleton />
                </Grid>

                <Grid item sm={8} xs={12}>
                    <GallerySkeleton />
                </Grid>  
            </Grid>
        )
    )
}

export default withStyles(styles)(User)
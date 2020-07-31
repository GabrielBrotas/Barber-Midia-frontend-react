import React, {Fragment, useEffect, useState} from 'react'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {getAllUsers} from '../redux/actions/userActions'
import {getAllPlaces, getPosts} from '../redux/actions/dataActions'

// mui
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

// components
import Barber from '../components/profile/Barber'
import Map from '../components/layout/Map'
import GalleryLocation from '../components/layout/GalleryLocation'

const styles = {
    GalleryContent:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
}

function Location(props) {

    const userInfo = useSelector(state => state.user)
    const {users} = userInfo

    const dataInfo = useSelector(state => state.data)
    const {places, posts, loading} = dataInfo

    const {classes} = props
    const [userSelected, setUserSelected] = useState(null)
    const [barber, setBarber] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(getAllUsers())
        dispatch(getAllPlaces())
        dispatch(getPosts())
    }, [dispatch])

    useEffect( () => {
        userSelected 
        ? users.map( user => user.handle === userSelected.userOwner && setBarber(user))
        : setBarber(null)
        
    }, [userSelected, barber, users])

    useEffect( () => {
        barber && !posts.lenght > 0 ?
        setUserPosts(
            posts.map( (post) => (
                post.userHandle === barber.handle && <GalleryLocation key={post.postId} post={post} />
            )))
        : setUserPosts(<p>loading</p>)
    }, [posts, barber])

    return (
        <Fragment>

        <Grid container spacing={4}>
            <Grid item sm={8} xs={12}>
               <Map places={places} loading={loading} setUserSelected={setUserSelected} />
            </Grid>

            <Grid item sm={4} xs={12}>
                <Barber barber={barber} />
            </Grid>      
        </Grid>

        <div className={classes.GalleryContent}>
            {userPosts}
        </div>
        </Fragment>
    )
}

export default withStyles(styles)(Location)

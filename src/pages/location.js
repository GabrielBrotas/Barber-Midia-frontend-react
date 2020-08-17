import React, {Fragment, useEffect, useState} from 'react'
import theme from '../utils/theme'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {getAllUsers} from '../redux/actions/userActions'
import {getAllPlaces, getPosts} from '../redux/actions/dataActions'

// mui
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

// components
import Barber from '../components/profile/Barber'
import Map from '../components/layout/Map'
import GalleryLocation from '../components/layout/GalleryLocation'

const styles = {
    GalleryContent:{
        marginTop: "3rem",
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.backgroundColorMain,
    },
    BarberContent: {
        marginTop: "43.32px",
        backgroundColor: theme.backgroundColorMain,
        color: theme.fontMainColor,
    },
    Font: {
        color: theme.mainColor
    },
    HorizontalRow: {
        width: "80%",
        alignSelf: "center",
        height: ".1rem",
        borderBottom: "none"
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
        ? users.map( user => user.handle === userSelected.handle && setBarber(user))
        : setBarber(null)
        
    }, [userSelected, users])

    useEffect( () => {
        barber && !posts.lenght > 0 ?
        setUserPosts(
         <GalleryLocation posts={posts} barber={barber} />
        )   
        : setUserPosts(<p>loading</p>)
    }, [posts, barber])
 
    return (
        <Fragment>

        <Grid container spacing={4}>
            <Grid item sm={8} xs={12}>
                <Map places={places} loading={loading} setUserSelected={setUserSelected} userSelected={userSelected} barber={barber} />
            </Grid>

            <Grid item sm={4} xs={12}>
                <div className={classes.BarberContent}>
                    <Barber barber={barber} />
                </div>
            </Grid>      
        </Grid>

        <div className={classes.GalleryContent}>
            
            { barber && 
                <Fragment>
                    <Typography
                    variant="h3"
                    align="center"
                    className={classes.Font}
                    >
                        Trabalhos de {barber.handle}:
                    </Typography>
                    <hr className={classes.HorizontalRow} />
                    {userPosts}
                </Fragment>

           
            }
        </div>
        </Fragment>
    )
}

export default withStyles(styles)(Location)

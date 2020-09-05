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
import LocationDetails from '../components/layout/LocationDetails'
import Profile from '../components/profile/Profile'
import Map from '../components/layout/Map'
import Gallery from '../components/layout/Gallery'

const styles = {
    GalleryContent:{
        marginTop: "3rem",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.backgroundColorMain,
        width: "80%",
        marginLeft: 'auto',
        marginRight: "auto"
    },
    BarberContent: {
        marginTop: "43.32px",
        backgroundColor: theme.backgroundColorMain,
        color: theme.fontMainColor
    },
    Font: {
        color: theme.mainColor
    },
    HorizontalRow: {
        width: "100%",
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
        barber && !posts.lenght > 0 &&
        setUserPosts(
            posts.filter( post => (
                post.userHandle === barber.handle && post.bodyImage !== "" && post  
            )))
        
    }, [posts, barber])

    return (
        <Fragment>

        <Grid container spacing={4}>
            <Grid item sm={8} xs={12}>
                <Map places={places} loading={loading} setUserSelected={setUserSelected} userSelected={userSelected} barber={barber} />
            </Grid>

            <Grid item sm={4} xs={12} style={{ contain: 'content'}}>
                {barber ? 
                    <div className={classes.BarberContent}>
                        <Profile credentials={barber} />
                    </div>
                : <LocationDetails />
                }
                
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
                    <Gallery userPosts={userPosts} /> 
                </Fragment>
            }
        </div>
        </Fragment>
    )
}

export default withStyles(styles)(Location)

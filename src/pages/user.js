import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getAllUsers} from '../redux/actions/userActions'
import {getPosts} from '../redux/actions/dataActions'

// MUI
import Grid from '@material-ui/core/Grid'

// components
import Barber from '../components/profile/Barber'
import Gallery from '../components/layout/Gallery'

function User(props) {

    const usersList = useSelector(state => state.user)
    const {users, loading} = usersList

    const postList = useSelector(state => state.data)
    const {posts} = postList

    const userHandle = props.match.params.handle

    const [selectedUser, setSelectedUser] = useState([])

    const dispatch = useDispatch() 

    useEffect( () => {
        dispatch(getAllUsers())
        dispatch(getPosts())
    }, [])

    useEffect( () => {
        setSelectedUser(users.filter( user => userHandle === user.userId))
    }, [userHandle, users])

    return ( !loading ?
        (<Grid container spacing={4}>
            
            <Grid item sm={4} xs={12}>
                <Barber selectedUser={selectedUser}/> 
            </Grid>

            <Grid item sm={8} xs={12}>
                 <Gallery selectedUser={selectedUser}/>
            </Grid>
            
        </Grid>) : (
            <p>loading...</p>
        )


    )
}

export default User

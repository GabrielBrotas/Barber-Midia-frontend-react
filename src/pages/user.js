import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getAllUsers} from '../redux/actions/userActions'

// MUI
import Grid from '@material-ui/core/Grid'

// components
import Barber from '../components/profile/Barber'

function User(props) {

    const usersList = useSelector(state => state.user)
    const {users, loading} = usersList
    const userHandle = props.match.params.handle

    const [selectedUser, setSelectedUser] = useState({})
    const dispatch = useDispatch() 

    useEffect( () => {
        dispatch(getAllUsers())
    }, [])

    // todo, pegar todos os users e passar para Barber

    return (

        <Grid container spacing={4}>
            
            <Grid item sm={4} xs={12}>
                {!loading && 
                    <Barber selectedUser={selectedUser}/> 
                }
               
            </Grid>

            <Grid item sm={8} xs={12}>
                <p>fotos...</p>
            </Grid>
            
        </Grid>


    )
}

export default User

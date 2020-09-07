import React from 'react'

import Grid from '@material-ui/core/Grid'

import Sidebar from '../components/Chat/Sidebar'
import Chat from '../components/Chat/Chat'

export default function messages() {
    return (
    <Grid container spacing={3}>
            
        <Grid item sm={4} xs={12}>
            <Sidebar />
        </Grid>

        <Grid item sm={8} xs={12}>
            <Chat />
        </Grid>  
        
    </Grid>
    
)}

import React from 'react'

import Grid from '@material-ui/core/Grid'

export default function messages() {
    return (
    <Grid container spacing={3}>
            
        <Grid item sm={4} xs={12}>
            <p>usuarios</p>
        </Grid>

        <Grid item sm={8} xs={12}>
            <p>inbox</p>
        </Grid>  
        
    </Grid>
    
)}

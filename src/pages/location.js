import React, {Fragment} from 'react'

import Grid from '@material-ui/core/Grid'

// components
import Barber from '../components/profile/Barber'
import Map from '../components/layout/Map'
// import BarberCard from '../components/profile/BarberCard'

function Location() {

    return (
        <Fragment>

        <Grid container spacing={4}>
            <Grid item sm={8} xs={12}>
               <Map />
            </Grid>

            <Grid item sm={4} xs={12}>
                <Barber />
            </Grid>      
        </Grid>

        <div>
            {/* <BarberCard /> */}
            <p>barber card</p>
        </div>
        </Fragment>
    )
}

export default Location

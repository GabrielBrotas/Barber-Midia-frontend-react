import React, {Fragment} from 'react'

import Grid from '@material-ui/core/Grid'

// components
import Barber from '../components/profile/Barber'
import Map from '../components/layout/Map'
import BarberCard from '../components/profile/BarberCard'

function Location() {

    

    return (
        <Fragment>

        <Grid container spacing={4}>
            
            {/* coluna das screams */}
            <Grid item sm={8} xs={12}>
               <Map />
            </Grid>

            {/* coluna do perfil do usuario */}
            <Grid item sm={4} xs={12}>
                <Barber />
            </Grid>
            
        </Grid>

        <div>
            <BarberCard />
        </div>
        </Fragment>
    )
}

export default Location

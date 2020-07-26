// * libraries
import React, { useState, useEffect } from 'react'
// criar colunas
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

// redux

// * components
// componente da scream
// import Scream from '../components/scream/Scream'
// import Profile from '../components/profile/Profile'

function Home(props) {

    
    return (
        // display grid que vai ser o container (pai) e dentro vai ter a quantidade de grids(colunas) que quere com a largura que cada um vai ocupar
        <Grid container spacing={4}>
            
            {/* coluna das screams */}
            <Grid item sm={8} xs={12}>
               <p> images section...</p>
            </Grid>

            {/* coluna do perfil do usuario */}
            <Grid item sm={4} xs={12}>
                <p>profile section</p>
            </Grid>
            
        </Grid>
    )
    
}


export default Home


import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import theme from '../../utils/theme'

import AddPlaceDetails from './AddPlaceDetails'

// MUI stuffs
import { Paper } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

// Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = {
    paper:{ 
        backgroundColor: theme.backgroundColorMain,
        color: theme.fontMainColor,
        margin: 20,
        minWidth: 200,
    },
    detailsHeader:{ 
        paddingTop: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: theme.backgroundColorMain,
        width: "80%",
        marginLeft: 'auto',
        marginRight: "auto"
    },
    HorizontalRow: {
        width: "100%",
        alignSelf: "center",
        height: ".1rem",
        borderBottom: "none"
    },
    detailsItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
    },
    iconTrue: {
        color: theme.mainColor,
        marginRight: '.4rem'
    },
    iconEdit: {
        color: theme.secondaryColor
    }
}

function ExtraDetails(props) {
    const {classes, placeDetails} = props
    
    return(
        placeDetails && placeDetails.length > 0 ? (
            <Paper className={classes.paper}>
                <div className={classes.detailsHeader}>
                    <Typography variant="h5" style={{marginRight: 'auto', marginLeft: 'auto'}}>Detalhes</Typography>
                    <AddPlaceDetails className={classes.iconEdit} />
                </div>
                <hr className={classes.HorizontalRow} />
                <div className={classes.detailsBody}>
                    { placeDetails.map( (detail, index) => (
                        <div key={index} className={classes.detailsItem}>
                        <CheckCircleIcon className={classes.iconTrue} />
                            {detail}
                        </div>
                    ))}
                    
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
            <div className={classes.detailsHeader}>
                <Typography variant="h5">Sem Detalhes</Typography>
            </div>
            </Paper>
        )
    )
  
}

export default withStyles(styles)(ExtraDetails)

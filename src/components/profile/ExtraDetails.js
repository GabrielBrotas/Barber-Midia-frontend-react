import React, {Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import theme from '../../utils/theme'

// // components
// import MyButton from '../../utils/MyButton'
// import EditDetails from './EditDetails.js'
// // redux
// import { useSelector, useDispatch } from 'react-redux'

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
        justifyContent: 'space-around',
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
        padding: '1rem 0.5rem',
    },
    iconTrue: {
        color: theme.mainColor,
        marginRight: '.4rem'
    }
}

function ExtraDetails(props) {

    const {classes} = props
        
    return(
        <Paper className={classes.paper}>
            <div className={classes.detailsHeader}>
                <Typography variant="h5">Detalhes</Typography>
                <hr className={classes.HorizontalRow} />
            </div>

            <div className={classes.detailsBody}>
                <div className={classes.detailsItem}>
                    <CheckCircleIcon className={classes.iconTrue} />
                    CADEIRA HIDRÁULICA
                </div>
            </div>
        </Paper>
    )
  
}

export default withStyles(styles)(ExtraDetails)

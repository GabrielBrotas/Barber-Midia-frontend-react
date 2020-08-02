import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'


// MUI stuffs
import { Paper } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    paper: {
        backgroundColor: theme.backgroundColorMain
    },
    cardContent: {
        width: "100%",
        flexDirection: 'column',
        padding: 25
    },
    userPictureContent: {
        height: 100,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '1rem'
    },
    userPicture: {
        color: theme.mainColor,
        width: "100%",
        height: "100%"
    },
    handle: {
        width: 100,
        height: 18,
        backgroundColor: theme.mainColor,
        marginBottom: 7,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    date: {
        height: 14,
        width: 75,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10
    }
    
})

function ProfileSkeleton(props) {

    const {classes} = props

    return (
    // colocar o profile em um content 'Paper'
    <Paper className={classes.paper} > 
        
        <div className="profile-details">
            <CardContent className={classes.cardContent}>
                <div className={classes.userPictureContent}>
                    <CircularProgress className={classes.userPicture} size={100} thickness={1}/>
                </div>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
            </CardContent>
        </div>

    </Paper>
    )
  
}


export default withStyles(styles)(ProfileSkeleton)

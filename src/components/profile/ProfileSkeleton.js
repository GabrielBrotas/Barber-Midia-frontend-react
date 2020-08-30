import React from 'react'

// MUI stuffs
import { Paper } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import withStyles from '@material-ui/core/styles/withStyles'

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
        width: 150,
        height: 18,
        backgroundColor: theme.mainColor,
        marginBottom: '.8rem',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    subHandle: {
        backgroundColor: '#5d5d5d',
        marginBottom: '.5rem'
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
                <Skeleton variant="text" className={classes.handle} />
                <Skeleton variant="text" className={classes.subHandle} />
                <Skeleton variant="text" className={classes.subHandle} />
            </CardContent>
        </div>

    </Paper>
    )
  
}


export default withStyles(styles)(ProfileSkeleton)

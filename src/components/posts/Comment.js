import React from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' 
import DeleteButton from './DeleteButton.js'

// MUI
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
    userHandle: {
      color: "#fff"
    },
    dateTimePost: {
      color: "#959595",
    },
    imageContent: {
        alignSelf: 'center',
        textAlign: '-webkit-center'
    },
    commentImage: {
        maxWidth: '100%',
        height: 40,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 10,
        marginBottom: '1rem'
    },
    visibleSeparator:{
      width: "100%",
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    invisibleSeparator:{
      width: "100%",
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 10
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
})

function Comments(props) {

    const {classes, handle, comment:{bodyText, createdAt, userHandle, userImage, commentId}} = props
    dayjs.extend(relativeTime)
    
    return(
        <Grid container >

            <Grid item sm={12} style={{width: "100%"}} >
            <Grid container style={{flexFlow: "nowrap"}}>
  
                <Grid item sm={1} className={classes.imageContent}>
                    <Avatar alt="Remy Sharp" src={userImage} className={classes.small} />
                </Grid>
                <Grid item sm={9} style={{flexFlow: "nowrap"}}>
                    <div className={classes.commentData}>
                        <Typography
                        variant="subtitle1"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary">
                            <p className={classes.userHandle}>{userHandle}</p>
                        </Typography>

                        <Typography
                        variant="body2"
                        color="textSecondary"
                        >
                            <span className={classes.dateTimePost}>{dayjs(createdAt).fromNow()}</span>
                        </Typography>

                        <Typography
                        variant="subtitle2"
                        style={{color: "#fff"}}
                        >{bodyText}</Typography>
                    </div>
                </Grid>
        
                
                {handle === userHandle &&  <DeleteButton className={classes.deleteButton} commentId={commentId} />}
                
            </Grid>
            
            </Grid>
            <hr className={classes.invisibleSeparator} />
        </Grid>
    )
}

export default withStyles(styles)(Comments)


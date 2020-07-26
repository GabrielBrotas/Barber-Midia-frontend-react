import React, { Fragment,  useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {getPost} from '../../redux/actions/dataActions'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = {
    imageContent: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    commentImage: {
        maxWidth: '100%',
        height: 40,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    },
    visibleSeparator:{
      width: "100%",
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    invisibleSeparator:{
      width: "100%",
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
}

function Comments(props) {

    const {postId, classes} = props

    const dataList = useSelector(state => state.data)
    const {post} = dataList

    const UI = useSelector(state => state.UI)
    const {loading} = UI

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getPost(postId))
    }, [postId, dispatch])
    
    return(
        <Grid container>
            { !loading ? post.comments.map( comment => {
                const {bodyText, createdAt, userImage, userHandle} = comment

                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                        <Grid container>
                            
                            <Grid item sm={2} className={classes.imageContent}>
                                <img src={userImage} alt="comment" className={classes.commentImage} />
                            </Grid>
                            <Grid item sm={9}>
                            
                                <div className={classes.commentData}>
                                    <Typography
                                    variant="body1"
                                    component={Link}
                                    to={`/users/${userHandle}`}
                                    color="primary">
                                        {userHandle}
                                    </Typography>

                                    <Typography
                                    variant="body2"
                                    color="textSecondary">
                                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                    </Typography>

                                    <Typography
                                    variant="body1"
                                    >{bodyText}</Typography>
                                </div>
                            </Grid>
                            <hr className={classes.invisibleSeparator} />
                        </Grid>
                        </Grid>

                    </Fragment>
                ) 
            }) : (
                <p>loading...</p>
            )}
        </Grid>
    )
}

export default withStyles(styles)(Comments)
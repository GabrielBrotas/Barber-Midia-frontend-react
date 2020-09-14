import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' 
import theme from '../utils/theme'

// redux
import {useDispatch, useSelector} from 'react-redux'
import {getPosts, getAllComments} from '../redux/actions/dataActions'

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';

// component
import LikeButton from '../components/posts/LikeButton'
import Comment from '../components/posts/Comment'
import CommentForm from '../components/posts/CommentForm'

const useStyles = makeStyles((theme) => ({
    imageContent: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white'
    },
    media: {
        height: 0,
        paddingTop: '80%', // 16:9
        backgroundSize: 'contain'
    },
    postDetail: {
      fontSize: 13,
      paddingLeft: '.1rem',
      paddingRight: '1rem'
    },
    commentContent: {
        padding: '15px',
        backgroundColor: theme.backgroundColorMain
    },
    userHandle: {
      color: "#000",
      width: 'max-content'
    },
}))

function Post(props) {
    const dispatch = useDispatch();
    const classes = useStyles(); 
    dayjs.extend(relativeTime)

    const dataList = useSelector(state => state.data)
    const {loading, posts, comments} = dataList

    const userInfo = useSelector(state => state.user)
    const {authenticated, likes, credentials: {handle}} = userInfo
 
    const [postId, setPostId] = useState(null)
    const [activePost, setActivePost] = useState({})
    const [postComments, setPostComments] = useState([])

    useEffect( () => {
        setPostId(props.match.params.postId)
        dispatch(getPosts())
        dispatch(getAllComments())
    }, [props.match.params, dispatch])

    useEffect( () => {
        posts.forEach( post => {
            post.postId === postId && setActivePost(post)
        })
    }, [posts, postId, likes])

    useEffect( () => {
        comments ?
        setPostComments(
            comments.map( (comment) => ( comment.postId === postId && 
                <Comment className={classes.allComments} key={comment.createdAt} postId={postId} comment={comment} authenticated={authenticated} handle={handle} imageUrl={activePost.imageUrl} />
            )))
        : setPostComments(<p>loading</p>)
      }, [authenticated, handle, comments, postId, dataList, activePost, classes.allComments])

    return !loading ? (
       <Grid container spacing={2}>
            
        {/* coluna das screams */}
        <Grid item sm={8} xs={12}>

            { activePost.bodyImage && 
                <CardMedia
                className={classes.media}
                image={activePost.bodyImage}
                title="Contemplative Reptile"
                alt="Contemplative Reptile"
                />
            }
            
        </Grid>

        {/* coluna do perfil do usuario */}
        <Grid item sm={4} xs={12}>
            <Card className={classes.root}>

            <CardHeader
                classes={classes.cardHeaderStyle}
                avatar={
                <Avatar aria-label="recipe">
                    <Avatar alt="Remy Sharp" src={activePost.userImage} />
                </Avatar>
                }
                title={<Link to={`/user/${activePost.userHandle}`}><p className={classes.userHandle}>{activePost.userHandle}</p></Link>}
                subheader={<p className={classes.dateTimePost}>{dayjs(activePost.createdAt).fromNow()}</p>}
            />

            <CardContent>
                <Typography variant="body2" component="p">
                {activePost.bodyText}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <LikeButton authenticated={authenticated} likes={likes} postId={postId} />
                <div className={classes.postDetail}>
                {activePost.likeCount} Likes
                </div>

                <CommentIcon style={{color: theme.mainColor, marginRight: 8}} />
                <div className={classes.postDetail}>
                {activePost.commentCount} {activePost.commentCount > 1 ? 'Comentários' : 'Comentário' }
                </div>
            </CardActions>

            <CardContent className={classes.commentContent}> 
                {authenticated 
                    ? <CommentForm imageUrl={activePost.imageUrl} postId={postId} />
                    : <p>Log in to comment</p>
                }
                {postComments}
            </CardContent>

            </Card>
        </Grid>
        
    </Grid>
    ) : (
        <p>loading...</p>
    )
    
}

export default Post
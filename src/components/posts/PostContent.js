import React, {useState, useEffect}from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' 

// redux
import {useSelector, useDispatch} from 'react-redux'
import {getPost} from '../../redux/actions/dataActions'

// Component
import DeletePost from './DeletePost.js'
import LikeButton from './LikeButton'
import MyButton from '../../utils/MyButton'
import Comment from './Comment'
import CommentForm from './CommentForm'

// MUI
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

// MUI icons
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// card imagens
import imageOne from '../../assets/cards/card1.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    marginBottom: '4rem'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  postDetail: {
    fontSize: 13,
    paddingLeft: '.1rem',
    paddingRight: '1rem'
  }
  
}));

function RecipeReviewCard(props) {

  const dataList = useSelector(state => state.data)
  const {post: {comments}} = dataList

  const {
    post: {bodyImage, bodyText, createdAt, userImage, userHandle, likeCount, commentCount, postId},
    handle, imageUrl, authenticated, likes
  } = props

  const [postCommments, setPostComments] = useState([])
  const [expanded, setExpanded] = useState(false);

  dayjs.extend(relativeTime)
  const dispatch = useDispatch();
  const classes = useStyles();

  const deleteButton = authenticated && userHandle === handle ? (
    <DeletePost postId={postId}/>
  ) : null
  

  useEffect( () => {
    dispatch(getPost(postId))
  }, [dispatch, postId])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect( () => {
    comments ?
    setPostComments(
        comments.map( (comment) => ( comment.postId === postId && 
            <Comment key={comment.createdAt} postId={postId} comment={comment} authenticated={authenticated} handle={handle} imageUrl={imageUrl} />
        )))
    : setPostComments(<p>loading</p>)

  }, [authenticated, handle, imageUrl, comments, postId, dataList])

  return (
    <Card className={classes.root}>
      <Link to="/user">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={userImage} alt='user profile' className={classes.avatar} />
          </Avatar>
        }
        action={
          deleteButton
        }
        title={userHandle}
        subheader={dayjs(createdAt).fromNow()}
      />
      </Link>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {bodyText}
        </Typography>
      </CardContent>
        
      {bodyImage &&
      <CardMedia
      className={classes.media}
      image={bodyImage}
      />
      }
      
      <CardActions disableSpacing>
        
        <LikeButton authenticated={authenticated} likes={likes} postId={postId} />
        <div className={classes.postDetail}>
          {likeCount} Likes
        </div>
      
        
        <MyButton tip="comments" onClick={handleExpandClick}>
          <CommentIcon color="primary" />
        </MyButton>
        <div className={classes.postDetail}>
          {commentCount} Comments
        </div>
       
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent> 
          <CommentForm imageUrl={imageUrl} postId={postId} expanded={expanded}/>
          {postCommments}
        </CardContent>
      </Collapse>
    </Card>
  );
}

RecipeReviewCard.prototype = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    likes: PropTypes.object.isRequired,

}

export default RecipeReviewCard
import React, {useState, useEffect}from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' 
import theme from '../../utils/theme'


// redux
import {useSelector, useDispatch} from 'react-redux'
import {getAllComments} from '../../redux/actions/dataActions'

// Component
import DeletePost from './DeleteButton.js'
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

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '4rem',
    backgroundColor: theme.backgroundColorSecondary,
    color: "#fff",
    "& .MuiCardHeader-content": {
      flex: 0
    },
    "& .MuiCardHeader-action": {
      marginLeft: "auto"
    }
  },
  userHandle: {
    color: "#fff",
  },
  dateTimePost: {
    width: "max-content",
    color: "#959595"
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
  },
  allComments: {
    maxHeight: 500,
    overflowY: "scroll",
    
  },
  "::-webkit-scrollbar-track": {
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    borderRadius: 10,
    backgroundColor: "#F5F5F5"
    
  }
  
}));

function RecipeReviewCard(props) {

  const dataList = useSelector(state => state.data)
  const {comments} = dataList

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
    <DeletePost className={classes.deleteButton} postId={postId}/>
  ) : null
  
  useEffect( () => {
    dispatch(getAllComments())
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
      
      <CardHeader
        classes={classes.cardHeaderStyle}
        avatar={
          <Avatar aria-label="recipe">
            <img src={userImage} alt='user profile' className={classes.avatar} />
          </Avatar>
        }
        action={
          deleteButton
        }
        title={<Link to={`/user/${userHandle}`}><p className={classes.userHandle}>{userHandle}</p></Link>}
        subheader={<p className={classes.dateTimePost}>{dayjs(createdAt).fromNow()}</p>}
      />
     

      <CardContent>
        <Typography variant="body2" component="p">
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
          <CommentIcon style={{color: theme.mainColor}} />
        </MyButton>
        <div className={classes.postDetail}>
          {commentCount} Comments
        </div>
       
        <IconButton
          style={{color: theme.mainColor}}
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
        <CardContent className={classes.allComments}> 
          {authenticated 
            ? <CommentForm imageUrl={imageUrl} postId={postId} expanded={expanded}/>
            : <p>Log in to comment</p>}
          
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
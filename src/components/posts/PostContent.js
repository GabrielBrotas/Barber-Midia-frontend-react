import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' //2days ago.., 2 hours agor...

// Component
import DeletePost from './DeletePost.js'

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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Comment';
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
    paddingLeft: '.3rem'
  }
  
}));

function RecipeReviewCard(props) {
  const classes = useStyles();

  const {
    post: {bodyImage, bodyText, createdAt, userImage, userHandle, likeCount, commentCount, postId},
    handle, authenticated, likes
  } = props

  const deleteButton = authenticated && userHandle === handle ? (
    <DeletePost postId={postId}/>
  ) : null

  dayjs.extend(relativeTime)

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={userImage} className={classes.avatar} />
          </Avatar>
        }
        action={
          deleteButton
        }
        title={userHandle}
        subheader={dayjs(createdAt).fromNow()}
      />


      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {bodyText}
        </Typography>
      </CardContent>
        
      {bodyImage &&
      <CardMedia
      className={classes.media}
      image={imageOne}
      />
      }
      
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          <div className={classes.postDetail}>
            {likeCount} Likes
          </div>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
          <div className={classes.postDetail}>
            {commentCount} Comments
          </div>
        </IconButton>
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

// RecipeReviewCard.prototype = {
//     post: PropTypes.object.isRequired,
//     classes: PropTypes.object.isRequired,
//     likes: PropTypes.object.isRequired,
//     openDialog: PropTypes.bool
// }

export default RecipeReviewCard
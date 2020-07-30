import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 260,
    maxHeight: 250,
    marginBottom: '2rem',
    width: '100%'
  },
  media: {
    height: 140,
    backgroundSize: 'contain'
  },
  description: {
    height: 100
  }
});

function MediaCard(props) {
  const classes = useStyles();
  const {post: {bodyImage, bodyText}} = props

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={bodyImage}
          title="Contemplative Reptile"
        />

      </CardActionArea>
      <CardContent className={classes.description}>
        <Typography variant="body2" color="textSecondary" component="p">
          {bodyText}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MediaCard
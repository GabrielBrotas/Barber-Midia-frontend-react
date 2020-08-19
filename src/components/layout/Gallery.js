import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: "2rem"
  },
  gridList: {
    width: 900,
    height: 450,
    backgroundColor: theme.backgroundColorMain
  },
  gridImage: {
    height: "100%",
    width: "100%",
    padding: ".5rem",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function GalleryLocation(props) {
  const {posts, barber} = props

  const classes = useStyles();
  
  return (
    <div className={classes.root}>

      <GridList cellHeight={250} className={classes.gridList} cols={3}>

      {posts.map( post => (
      post.userHandle === barber &&

        <GridListTile key={post.postId} cols={1} className={classes.gridContent}>
          <img src={post.bodyImage} alt={post.bodyText} className={classes.gridImage} />
        </GridListTile>

      ))}

      </GridList>
      
    </div>
  );
}

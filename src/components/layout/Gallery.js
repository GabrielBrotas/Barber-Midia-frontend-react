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
    margin: "2rem 0",
  },
  gridList: {
    backgroundColor: theme.backgroundColorMain,
    maxHeight: "40rem",
    maxWidth: 800,
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: "scroll",
    listStyle: "none", 
    justifyContent: "center"
  },
  gridImage: {
    padding: ".5rem",
    width: 200,
    borderRadius: "1rem",
    transition: ".3s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.2)"
    }
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

      <ul cellHeight={250} className={classes.gridList}>

      {posts.map( post => (
      post.userHandle === barber &&

        <li key={post.postId} cols={1} className={classes.gridContent}>
          <img src={post.bodyImage} alt={post.bodyText} className={classes.gridImage} />
        </li>

      ))}
      
      </ul>
      
    </div>
  );
}

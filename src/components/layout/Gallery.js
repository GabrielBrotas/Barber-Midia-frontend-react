import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridList: {
    backgroundColor: theme.backgroundColorMain,
    width: "100%",
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: "none", 
    justifyContent: "center",
    background: `linear-gradient(to top, ${theme.backgroundColorMain}, ${theme.mainColor})`
  },
  gridContent: {
    alignSelf: "center"
  },
  gridImage: {
    margin: ".3rem",
    width: 200,
    height: 200,
    borderRadius: "1rem",
    transition: ".3s ease-in-out",
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.2)",
      zIndex: 100
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

    <ul className={classes.gridList}>

    {posts.map( post => (
    post.userHandle === barber &&

      <li key={post.postId} className={classes.gridContent}>
        <img src={post.bodyImage} alt={post.bodyText} className={classes.gridImage} />
      </li>

    ))}
    
    </ul>
    
  );
}

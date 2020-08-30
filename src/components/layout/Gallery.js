import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  boardz: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    flex: 'auto',
    "& ul li":{
      flex: 'auto',
      boxShadow: "0px 0px 36px -12px #A77D2D",
      maxWidth: 300,
      margin: '0.1rem',
    },
    "& li": {
      transition: ".3s ease-in-out",
      "& span": {
        bottom: '0px',
        display: 'none',
        opacity: 0,
        visibility: 'hidden',
        backgroundColor: 'rgba(92, 91, 87, 0)',
        color: 'rgba(92, 91, 87, 0)',
      },
      "&:hover": {
        transform: "scale(1.2)",
        zIndex: 100,
        "& span": {
          position: 'absolute',
          bottom: 'auto',
          display: 'block',
          background: 'white',
          width: '-webkit-fill-available',
          padding: '1rem .5rem',
          visibility: 'visible',
          opacity: 1,
          color: 'rgba(0, 0, 0, 0.8)'
        },
      }
    }
  },
  boardzUl: {
    listStyleType: 'none',
    flexDirection: "column",
    justifyContent: "center",
  },
  gridImage: {
    borderRadius: ".2rem",
    cursor: "pointer",
    width: "100%"
  },
  divToNoPosts: {
    marginTop: '1rem', 
    marginBottom: '10rem',
  },
  textToNoPosts: {
    color: theme.fontMainColor,
  }
}));


export default function GalleryLocation(props) {
  const classes = useStyles();
  const {userPosts} = props
  
  return (
    userPosts.length > 0 ? (
    <div className={classes.boardz}>
      
      <ul className={classes.boardzUl}>
        {userPosts.map( (post, index) => (
          index % 2 === 0 && (
            <li key={post.postId}>
              <img src={post.bodyImage} alt={post.bodyText} className={classes.gridImage} />
              <span>{post.bodyText}</span>
            </li>
          ) 
        ))}
      </ul>

      <ul className={classes.boardzUl}>
        {userPosts.map( (post, index) => (
            index % 2 === 1 && (
              <li key={post.postId}>
                <img src={post.bodyImage} alt={post.bodyText} className={classes.gridImage} />
                <span>{post.bodyText}</span>
              </li>
            ) 
          ))}
      </ul>

    </div> 
    ) : (
      <div className={classes.divToNoPosts}>
      <Typography variant="h5" className={classes.textToNoPosts}>
        Este usuário não tem trabalhos publicado.
      </Typography>
      </div>
     
    )
  );
}


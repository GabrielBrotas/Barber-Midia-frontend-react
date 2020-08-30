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
    }
  },
  boardzUl: {
    listStyleType: 'none',
    flexDirection: "column",
    justifyContent: "center",
    
  },
  gridImage: {
    borderRadius: ".2rem",
    transition: ".3s ease-in-out",
    cursor: "pointer",
    width: "100%",
    "&:hover": {
        transform: "scale(1.2)",
        zIndex: 100
    }
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
            </li>
          ) 
        ))}
      </ul>

      <ul className={classes.boardzUl}>
        {userPosts.map( (post, index) => (
            index % 2 === 1 && (
              <li key={post.postId}>
                <img src={post.bodyImage} alt={post.bodyText} className={classes.gridImage} />
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


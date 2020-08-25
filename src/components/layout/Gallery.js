import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridList: {
    backgroundColor: theme.backgroundColorMain,
    width: "100%",
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: "none", 
    justifyContent: "center",
    background: `linear-gradient(to top, ${theme.backgroundColorMain}, ${theme.mainColor})`,
  },
  gridContent: {
    alignSelf: "center"
  },
  gridImage: {
    margin: "5px",
    height: 200,
    borderRadius: ".3rem",
    transition: ".3s ease-in-out",
    cursor: "pointer",
    maxWidth: 400,
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
  const classes = useStyles();
  const {posts, barber} = props

  const allImages = document.getElementsByTagName('img')
  
  useEffect( () => {
    for(let i = 0; i < allImages.length; i++){
      allImages[i].className !== 'profile-image' &&
        allImages[i].naturalWidth - allImages[i].naturalHeight >= 500 ?
          allImages[i].style = 'width: 400px; margin-left: .75rem; margin-right: .75rem'
        : allImages[i].style = 'width: 200px'
    }
  }, [allImages])
  

  return (

    <ul className={classes.gridList}>
     { posts.map( post => (
        post.userHandle === barber && (
          <li key={post.postId} className={classes.gridContent}>
            <img src={post.bodyImage} alt={post.bodyText} className={classes.gridImage} />
          </li>
        )  
      ))}
    </ul>
    
  );
}

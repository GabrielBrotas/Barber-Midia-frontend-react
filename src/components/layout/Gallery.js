import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boardz: {
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
  }
}));


export default function GalleryLocation(props) {
  const classes = useStyles();
  const {userPosts} = props

  return (
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
  );
}

// export default function GalleryLocation(props) {
//   const classes = useStyles();
//   const {posts, barber} = props
  
//   console.log(Math.ceil(posts.length / 3))
//   return (

//     <ul className={classes.gridList}>
//      { posts.map( post => (
//         post.userHandle === barber && (
//           <li key={post.postId} className={classes.gridContent}>
//             <img src={post.bodyImage} alt={post.bodyText} className={classes.gridImage} />
//           </li>
//         )  
//       ))}
//     </ul>
    
//   );
// }

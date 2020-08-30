import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  boardz: {
    display: 'flex',
    justifyContent: 'center',
    flex: 'auto',
    "& ul li":{
      flex: 'auto',
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

export default function GallerySkeleton() {
  const classes = useStyles();

  return (
    <div className={classes.boardz}>
      
      <ul className={classes.boardzUl}>
        {[200, 250, 100, 350, 250, 100, 130].map( (height, index) => (
            <li key={index}>
              <Skeleton variant="rect" width={300} height={height} />
            </li>
        ))}
      </ul>

      <ul className={classes.boardzUl}>
        {[130, 200, 110, 250, 150, 200, 305].map( (height, index) => (
            <li key={index}>
                <Skeleton variant="rect" width={300} height={height} />
            </li>
          ))}
      </ul>

    </div>
  );
}


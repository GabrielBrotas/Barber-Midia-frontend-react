import React from 'react';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShareIcon from '@material-ui/icons/Share';
import PhotoIcon from '@material-ui/icons/Photo';

const useStyles = makeStyles((theme) => ({
    titleBigger: {
      fontWeight: "bold",
      color: theme.mainColor, 
      margin: "3.8rem 0"
    },
    appDescription: {
      display: 'flex',
      marginBottom: "2rem",
      alignItems: 'center'
    },
    iconDescription: {
      color: theme.mainColor, 
      marginRight: "1rem",
      width: 40,
      height: 40,
    },
    typographyDescription: {
      color: '#fff'
    }
  }));

function LeftSideDescription() {

    const classes = useStyles();

    return (
        <Grid item xs={false} sm={4} md={7}>

            <Typography className={classes.titleBigger} component="h1" variant="h3">
                    Encontre as melhores barbearias e salões mais próximas de você.
            </Typography>

            <div className={classes.appDescription}>
            <LocationOnIcon className={classes.iconDescription}/>
            <Typography className={classes.typographyDescription} component="h2" variant="h5">
                <strong>Encontre</strong> barbearias ou salões mais próximos.
            </Typography>
            </div>

            <div className={classes.appDescription}>
            <ShareIcon className={classes.iconDescription} />
            <Typography className={classes.typographyDescription} component="h2" variant="h5">
                <strong>Compartilhe</strong> seu trabalho com todos.
            </Typography>
            </div>

            <div className={classes.appDescription}>
            <PhotoIcon className={classes.iconDescription} />
            <Typography className={classes.typographyDescription} component="h2" variant="h5">
                <strong>Se inspire</strong> em outros trabalhos.
                </Typography>
            </div>
        </Grid>
    )
}

export default LeftSideDescription
import React from 'react';

// MUI
import { Alert } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        marginLeft: 'auto',
        marginRight: "auto",
        marginTop: "2rem"
    },
    userInfo: {
        textAlign: 'center',   
    }
}));

function Verify(props) {
  const classes = useStyles();
  console.log(props)
  
  return (
    <div className={classes.root}>
      <Alert severity="success">Conta confirmada com sucesso!</Alert>
      <div className={classes.userInfo}>
      <Typography className={classes.titleBigger} component="h4" variant="h6">
            Bem vindo ao nosso App ! Divirta-se.
        </Typography>
      </div>
      
    </div>
  );
}


export default Verify
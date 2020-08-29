import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {getTokenAndHandleFromParams} from '../utils/helpers'
// MUI
import { Alert } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import WorkIcon from '@material-ui/icons/Work';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
  root: {
      maxWidth: 500,
      marginLeft: 'auto',
      marginRight: "auto",
      marginTop: "2rem",
      backgroundColor: theme.mainColor,
      color: theme.backgroundColorMain,
      boxShadow: "0px 0px 36px -12px #A77D2D;"
  },
  alertDisplay: {
    justifyContent: 'center'
  },
  welcomeMessage: {
    padding: "1rem 0",
    textAlign: "center",
    fontSize: 'xx-large'
  },
  appInfo: {
    textAlign: 'center',
    color: '#c5c5c5',
    backgroundColor: theme.backgroundColorSecondary,
    padding: ".8rem 0"
  },
  appDescription: {
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  iconImage: {
    color: theme.mainColor, 
    margin: "0 .8rem",
    width: 40,
    height: 40,
  },
  submit: {
    padding: '1rem 2rem',
    margin: ".7rem 0",
    cursor: "pointer",
    backgroundColor: theme.mainColor, 
    color: theme.fontMainColor,
    fontWeight: "bold",
    '&:hover': {
      backgroundColor: '#664608',
    },
  }
}));

function Verify(props) {
  const classes = useStyles();

  const [handle, setHandle] = useState(null)
  const [token, setToken] = useState(null)

  useEffect( () => {
    setToken(getTokenAndHandleFromParams(props.match.params.handleAndToken).token)
    setHandle(getTokenAndHandleFromParams(props.match.params.handleAndToken).handle)
  }, [props])

  return (
    <>
    <Alert className={classes.alertDisplay} severity={!token ? "warning" : "success" }>
      { !token ? "Agora só falta confirmar a conta no seu email!" : "Conta confirmada com sucesso"}
    !</Alert>

    <div className={classes.root}>

      { !token ? (
        <Typography style={{padding: '1rem', textAlign: "center"}} component="h4" variant="h6">
          <strong>Olá {handle}, falta pouco para você ter acesso total ao nosso app !</strong>
        </Typography>
      ) : (
        <>
      <Typography className={classes.welcomeMessage} component="h4" variant="h5">
          <strong>Bem vindo ao nosso App {handle} !</strong>
      </Typography>

        <div className={classes.appInfo}>
        
          <div className={classes.appDescription}>
            <PersonPinCircleIcon className={classes.iconImage}/>
            <Typography component="h3" variant="h6">
              Se conecte com todos profissionais próximos a você
            </Typography>
          </div>

          <div className={classes.appDescription}>
            <WorkIcon className={classes.iconImage}/>
            <Typography component="h3" variant="h6">
              Trabalhe conosco e divulgue seu trabalho
            </Typography>
          </div>

          <div className={classes.appDescription}>
            <PeopleIcon className={classes.iconImage}/>
            <Typography component="h3" variant="h6">
              Se inspire com a arte dos profissionais 
            </Typography>
          </div>
        
          <Typography style={{ color: "#c5c5c5"}} component="h4" variant="h6">
            Divirta-se !!
          </Typography>

          <Link to="/login">
            <Typography className={classes.submit}>
              Login
            </Typography>
          </Link>
          
        </div>
        </>
      )}

    </div>
    </>
  );
}


export default Verify
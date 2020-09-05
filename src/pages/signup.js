import React, {useState} from 'react';
import PropTypes from 'prop-types'
import LeftSideDescription from '../components/layout/LeftSideDescription'
import theme from '../utils/theme'

// MUI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';

// components
import SignupForm from '../components/layout/SignupForm'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    '& .MuiFormLabel-root .Mui-focused': {
      borderBottomColor: 'green',
      color:"#fff"
    },
  },
  rightContent: {
    backgroundColor: theme.backgroundColorMain,
    color: theme.fontMainColor
  },
  header: {
    textAlign: '-webkit-center',
    margin: "1rem 0"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.mainColor,
  },
  typesButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "& span": {
      fontWeight: "bolder"
    }
  },
  buttonType: {
    width: '100%',
    maxWidth: 200,
    marginTop: '2rem'
  },
  infoContent: {
    display: "flex",
    margin: '5rem .5rem',
    alignItems: 'center'
  },
  infoIcon: {
    marginRight: '.5rem',
    cursor: 'point',
    color: theme.mainColor
  }
}));

function SignUpSide(props) {
  const classes = useStyles();

  const [type, setType] = useState(null)

  return (
    <Grid container component="main" className={classes.root}>
      
      <LeftSideDescription />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} className={classes.rightContent} square>

        <div className={classes.header}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        </div>
        
        {!type ? (
          <div className={classes.typesButton}>
          <Button onClick={() => setType("Usuario")} variant="contained" className={classes.buttonType} default>
            Usuario
          </Button>

          <Button onClick={() => setType("Profissional")} variant="contained" className={classes.buttonType}style={{backgroundColor: theme.secondaryColor}}>
            Profissional
          </Button>
          </div>
        ) : (
          <SignupForm type={type} setType={setType} history={props.history}/>
        )}

        {!type && 
        <div className={classes.infoContent}>
        <InfoIcon className={classes.infoIcon}/>
        Para começar, escolha de qual forma gostaria de se cadastrar no nosso app
        </div>
        }
        
      </Grid>
    </Grid>
  );
}

SignUpSide.protoTypes = {
  signupUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

export default SignUpSide
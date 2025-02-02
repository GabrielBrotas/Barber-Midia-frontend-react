import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import LeftSideDescription from '../components/layout/LeftSideDescription'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'

// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import CssTextField from '../components/others/CssTextField'

// icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <Link style={{ color: '#2D62A6'}} href="/">
        BarberMidia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    
  },
  rightContent: {
    backgroundColor: theme.backgroundColorMain,
    color: theme.fontMainColor,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.mainColor,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    borderColor: "#fff",
    '& fieldset': {
      borderColor: theme.fontSecondaryColor,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.mainColor, 
    color: theme.fontMainColor,
    fontWeight: "bold",
    '&:hover': {
      backgroundColor: '#664608',
    },
  },
  progress: {
    position: 'absolute',
    color: theme.mainColor
  },
  customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
      textAlign: 'center'
  },
  inputForm: {
    marginTop: 0,
    marginBottom: 25,
    '& input': {
      backgroundColor: '#fff',
    }
  }
}));

function SignInSide(props) {

  const classes = useStyles();

  const UI = useSelector( state => state.UI)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  // quando o usuario logar verificar se teve errors
  useEffect( () => {
    if(UI.errors){
        setErrors(UI.errors)
    }
  }, [UI])

  const dispatch = useDispatch()
  // logar
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
        email,
        password,
    }
    dispatch(loginUser(userData, props.history))
  }

  return (
    <Grid container component="main" className={classes.root}>

      <LeftSideDescription />

      <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.rightContent} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h3" variant="h5">
            Sign in
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <CssTextField
              className={classes.inputForm}
              margin="normal"
              variant="filled"
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              helperText={errors.email} error={errors.email ? true : false}
            />
            <CssTextField
              className={classes.inputForm}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ (e) => setPassword(e.target.value)}
              helperText={errors.password} error={errors.password ? true : false}
            />

            {UI.errors && 
              <Typography variant="body2" className={classes.customError}>
                {UI.errors.general}
              </Typography>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={UI.loading}
            >
              Log In
              {UI.loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link style={{ color: "#2D62A6"}} href="/signup" variant="body2">
                  {"Ainda não tem uma conta? Cadastre se"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

SignInSide.protoTypes = {
  loginUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

export default SignInSide
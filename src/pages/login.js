import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'

// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
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
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: 'absolute'
  },
  customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
      textAlign: 'center'
  },
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
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              helperText={errors.email} error={errors.email ? true : false}
            />
            <TextField
              variant="outlined"
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
              color="primary"
              className={classes.submit}
              disabled={UI.loading}
            >
              Sign In
              {UI.loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
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

export default SignInSide
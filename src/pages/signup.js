import React, { useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types'
import LeftSideDescription from '../components/layout/LeftSideDescription'
import Search from '../components/others/Search'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

// components
import SelectForm from '../components/others/SelectForm'

// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    '& .MuiFormLabel-root .Mui-focused': {
      borderBottomColor: 'green',
      color:"#fff"
    },
  },
  rightContent: {
    backgroundColor: theme.backgroundColorMain,
    color: theme.fontMainColor
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
    position: 'absolute'
  },
  customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
      textAlign: 'center'
  },
  searchInput: {
    color: "#281414",
    zIndex: 10,
  }
}));

function SignUpSide(props) {
  const classes = useStyles();

  const UI = useSelector( state => state.UI)

  const [handle, setHandle]= useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [category, setCategory] = useState('Usuario')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // quando o usuario logar verificar se teve errors
  useEffect( () => {
      if(UI.errors){
          setErrors(UI.errors)
          setLoading(false)
      }
  }, [UI])

  const dispatch = useDispatch()
  // logar
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
      confirmPassword,
      handle,
      category
    }
    dispatch(signupUser(userData, props.history, {title, handle, category, ...location}))
    
  }
  
  return (
    <Grid container component="main" className={classes.root}>
      
      <LeftSideDescription />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} className={classes.rightContent} square>
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            
            <CssTextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setHandle(e.target.value)} 
              helperText={errors.handle} error={errors.handle ? true : false}
            />
            <CssTextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              helperText={errors.email} error={errors.email ? true : false}
            />
            <CssTextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              helperText={errors.password} error={errors.password ? true : false}
            />
            <CssTextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)} 
              helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}
            />
            
            <SelectForm onChangeSelect={setCategory} category={category}/>

            {category !== "Usuario" && 
            <Fragment>
              <CssTextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                placeholder="Nome do estabelecimento"
                name="title"
                onChange={(e) => setTitle(e.target.value)} 
                helperText={errors.title} error={errors.title ? true : false}
              />
              <Search setLocation={setLocation} />
            </Fragment>
            }
            

            <FormControlLabel
              control={<Checkbox value="remember" style={{color: '#A77D2D'}} />}
              label="Concordo com os termos e políticas da empresa."
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>

            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link style={{ color: "#2D62A6"}} href="/login" variant="body2">
                  {"Já tem uma conta? Login"}
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


SignUpSide.protoTypes = {
  signupUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}
export default SignUpSide
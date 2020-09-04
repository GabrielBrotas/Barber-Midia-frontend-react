import React, {useState, useEffect} from 'react';

// redux
import {useSelector, useDispatch} from 'react-redux'
import {signupUser} from '../../redux/actions/userActions'

// components
import SelectForm from '../others/SelectForm'
import Search from '../others/Search'
import CssTextField from '../others/CssTextField'

// MUI
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  backIcon: {
    cursor: "pointer",
    color: theme.mainColor
  }
}))

export default function SignupForm(props) {
  const classes = useStyles()
  const {type, history} = props
  const UI = useSelector( state => state.UI)

  const [handle, setHandle]= useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect( () => {
    if(UI.errors){
        setErrors(UI.errors)
        setLoading(false)
    }
  }, [UI])

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
      confirmPassword,
      handle,
      type,
      category
    }
    
    if(location.description || type === "Usuario"){
      dispatch(signupUser(userData, history, {handle, category, ...location}))
    } else {
      setErrors({errors, location: "Selecione uma localização."})
    }
  
  }

  return (
    <div className={classes.paper}>
      
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        
        <CssTextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="username"
          label={type === "Empresa" ? "Nome da Empresa" : "Nome"}
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
        
        {type !== "Usuario" && 
        <>
        <SelectForm errors={errors} onChangeSelect={setCategory} category={category}/>

        <Search setLocation={setLocation} />
          
        </>
        }

        {errors.category && 
          <FormHelperText style={{color: "red", textAlign: "center"}}>{errors.category}</FormHelperText>
        }

        {errors.location && 
          <FormHelperText style={{color: "red", textAlign: "center"}}>{errors.location}</FormHelperText>
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
            <ArrowBackIosIcon className={classes.backIcon} onClick={() => props.setType(null)}/>
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
  )
}

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

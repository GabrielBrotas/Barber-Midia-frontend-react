// libraries
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './utils/theme'

// Redux
import {Provider} from 'react-redux'
import store from './redux/store'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {SET_AUTHENTICATED} from './redux/types'
import {logoutUser, getUserData} from './redux/actions/userActions'

// components
import Navbar from './components/layout/Navbar'
import AuthRoute from './utils/AuthRoute'
import NotAuthRoute from './utils/NotAuthRoute'

// pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import location from './pages/location'
import user from './pages/user'
import post from './pages/post'
import account from './pages/account'
import verify from './pages/verify'
import chat from './pages/chat'

// style global
const theme = createTheme(themeFile)

function App() {

  const [token, setToken] = useState('')

  useEffect( () => {
    setToken(localStorage.FBIdToken)
    if(token){
      // extrair as informações do token e transformar em um objeto
      const decodedToken = jwtDecode(token);
    
      if(decodedToken.exp * 1000 < Date.now()){
        store.dispatch(logoutUser)
      } else {
        // mudar o authenticated para true no reducer 
        store.dispatch({type: SET_AUTHENTICATED})
        // passar o token do usuario para a header
        axios.defaults.headers.common['Authorization'] = token
        // com o user authenticated, pegar os dados
        store.dispatch(getUserData())
      }
    }
  }, [token])

  return (
  <MuiThemeProvider theme={theme}>
  <Provider store={store}>
    <Router>
      <Navbar />

      <div className="container">
      <Switch>
        <NotAuthRoute exact path="/verify/:handleAndToken" component={verify} />
        <AuthRoute exact path="/chat/:chatId?" component={chat} />
        <AuthRoute exact path="/account" component={account} />
        <Route exact path="/location" component={location} />
        <Route exact path="/post/:postId" component={post} />
        <Route exact path="/user/:handle" component={user} />
        <NotAuthRoute exact path="/signup" component={signup} />
        <NotAuthRoute exact path="/login" component={login} />
        <Route exact path="/" component={home}  />
      </Switch>
      </div>
    </Router>
  </Provider>
  </MuiThemeProvider>

  );
}

export default App;

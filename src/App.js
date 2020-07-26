// libraries
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './styles/theme'

// components
import Navbar from './components/Navbar.js'

// pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

// style global
const theme = createTheme(themeFile)

function App() {
  return (
  <MuiThemeProvider theme={theme}>

    <Router>
      <Navbar />

      <div className="container">
      <Switch>
        <Route exact path="/signup" component={signup} />
        <Route exact path="/login" component={login} />
        <Route exact path="/" component={home}  />
      </Switch>

      </div>
    </Router>

  </MuiThemeProvider>

  );
}

export default App;

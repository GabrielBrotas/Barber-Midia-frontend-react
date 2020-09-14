import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {logoutUser} from '../../redux/actions/userActions'
import {Link} from 'react-router-dom'
import mainStyles from '../../utils/theme'

// components
import Notifications from './Notifications'
import ChatButton from './ChatButton'
import PostScream from '../posts/AddNewPost'
import NavbarInputList from './NavbarInputList'

// MUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import MuiLink from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

// MUI Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import PinDrop from '@material-ui/icons/PinDrop'
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: mainStyles.backgroundColorMain,
    position: "fixed",
  },
  leftActions: {
    display: "flex",
    marginRight: 'auto'
  },
  logo: {
    color: mainStyles.mainColor,
  },
  navContainer:{
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-between',
    padding: 0,
    
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    '& .MuiIconButton-edgeEnd': {
      marginRight: 0
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    '& .MuiIconButton-edgeEnd button': {
      marginRight: 0
    }
  },
  mobileMenu: {
    "& li": {
      padding: 0
    },
    '& .MuiIconButton-edgeEnd': {
      marginRight: 0
    }
  },
  search: {
    position: 'relative',
    marginRight: 'auto',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(0, 0, 0, 0.2);',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: 15,
    paddingRight: 15,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

function PrimarySearchAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.user)
  const {authenticated, loading, credentials: {category, handle}} = userInfo

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [inputBar, setInputBar] = useState('')

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MuiLink component={Link} to={`/user/${handle}`} color="primary" style={{textDecoration: "none", color: "#000"}}>
        <MenuItem onClick={handleMenuClose}>
          Perfil
        </MenuItem>
      </MuiLink>

      <MuiLink component={Link} to={"/account"} color="primary" style={{textDecoration: "none", color: "#000  "}}>
        <MenuItem onClick={handleMenuClose}>
          Configurações
        </MenuItem>
      </MuiLink>

      <MenuItem onClick={() => handleLogout()}>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.mobileMenu}
    >
      {
        category !== "Usuario" &&
        <MenuItem>
          <ChatButton iconColor="#000" closeMenu={handleMobileMenuClose} />
        </MenuItem>
      }

      <MenuItem>
        <Notifications iconColor="#000" />
      </MenuItem>

      {
        category !== "Usuario" &&
        <MenuItem onClick={handleProfileMenuOpen} >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
      }

    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar className={classes.navContainer}>
          
          <Typography className={classes.logo} variant="h5" noWrap>
            <Button color="inherit" component={Link} to="/">Logo</Button>
          </Typography>

          <div className={classes.leftActions}>
            <IconButton component={Link} to="/location" color="inherit">
              <PinDrop />
            </IconButton>

            {authenticated && category !== "Usuario" &&
              <IconButton aria-label="show 4 new mails" color="inherit">
                <PostScream /> 
              </IconButton>
            } 
           
          </div>

          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={inputBar}
              onChange={(e) => setInputBar(e.target.value)}
            />
            <NavbarInputList inputBar={inputBar} setInputBar={setInputBar}/>
          </div>
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
          {
            !loading && !authenticated ? (
              <Fragment> 
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
              </Fragment>
            ) : (
              <Fragment>
                {
                  category !== "Usuario" &&
                  <ChatButton iconColor="#fff"/>
                }
                
                <Notifications iconColor="#fff" />
                {
                  category !== "Usuario" &&
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Tooltip placement="top"  title="Profile">
                    <AccountCircle />
                  </Tooltip>
                </IconButton>
                }
              </Fragment>
            )
          }
            
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

PrimarySearchAppBar.protoTypes = {
  authenticated: PropTypes.bool.isRequired
}


export default PrimarySearchAppBar 
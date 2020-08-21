import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import mainStyles from '../../utils/theme'

// components
import Notifications from './Notifications'
import PostScream from '../posts/AddNewPost'

// MUI
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import MuiLink from '@material-ui/core/Link'

// MUI Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button'
import PinDrop from '@material-ui/icons/PinDrop'

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: mainStyles.backgroundColorMain,
    position: "fixed",
  },
  leftActions: {
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
    padding: 0
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: 'fade(theme.palette.common.white, 0.25)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function PrimarySearchAppBar() {
  const userInfo = useSelector(state => state.user)
  const {authenticated, loading, credentials: {category, handle}} = userInfo

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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
      <MenuItem onClick={handleMenuClose}>
        <MuiLink component={Link} to={`/user/${handle}`} color="primary" style={{textDecoration: "none", color: "#000"}}>
          Perfil
        </MuiLink>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <MuiLink component={Link} to={"/account"} color="primary" style={{textDecoration: "none", color: "#000  "}}>
          My account
        </MuiLink>
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
    >

      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
  
      <MenuItem onClick={handleProfileMenuOpen} >
       
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
          
        </IconButton>
        <p>Profile</p>
      </MenuItem>
   
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

            {authenticated &&
              <IconButton aria-label="show 4 new mails" color="inherit">
                <PostScream /> 
              </IconButton>
            } 
           
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

                <Notifications />
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
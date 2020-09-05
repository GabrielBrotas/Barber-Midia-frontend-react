import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import theme from '../../utils/theme'

// components
import MyButton from '../../utils/MyButton'
import EditDetails from './EditDetails.js'
// redux
import { useSelector, useDispatch } from 'react-redux'
import {uploadImage, logoutUser} from '../../redux/actions/userActions'

// MUI stuffs
import Button from '@material-ui/core/Button'
import { Paper } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'


// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import HowToRegIcon from '@material-ui/icons/HowToReg';

const styles = {
    paper: {
        backgroundColor: theme.backgroundColorMain,
        color: theme.fontMainColor,
        margin: 20,
        minWidth: 250,
        textAlign: '-webkit-center'
    },
    userDescription: {
        display: 'flex',
        marginTop: 15,
        "& p": {
            textAlign: 'left',
            marginRight: 20,
        }
    },
    iconProfile: {
        color: theme.secondaryColor,
        margin: '0 .5rem'
    },
    profile: {
        maxWidth: 300,
        marginTop: '-7rem',
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
            cursor: 'pointer'
            }
        }
    },
    imageWrapper: {
        textAlign: 'center',
        position: 'relative',
        '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
        }
    },
    profileImage: {
        width: 150,
        height: 150,
        margin: '1rem 0rem',
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    profileDetails: {
        textAlign: 'center',
        '& span, svg': {
        verticalAlign: 'middle'
        },
        '& a': {
        color: theme.mainColor
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    backgroundProfileImage: {
        backgroundImage: `linear-gradient(${theme.mainColor}, ${theme.backgroundColorMain})`,
        width: '100%',
        height: 110,
    }
    
}

function Profile(props) {

    const {classes} = props

    const {
        credentials: {handle, createdAt, imageUrl, bio, instagram, location, category, type},
        authenticated, authenticatedUser
    } = props

    const dataInfo = useSelector(state => state.data)
    const {places} = dataInfo

    const dispatch = useDispatch()
    
    // Mudar foto do perfil
    const handleImageChange = (event) => {
        // pegar a imagem, mesmo escolhendo apenas uma vai vim em um array entao vamos pegar a primeira
        const image = event.target.files[0]

        // criar um formData para mandar pro backend
        const formData = new FormData();
        // nesse form colocar um name, o arquivo e o blob name
        formData.append('image', image, image.name)
        // mandar para action do redux fazer o upload
        dispatch(uploadImage(formData))
    }

    const handleEditPicture = () => {
        // pegar o id do input onde escolher o arquivo
        const fileInput = document.getElementById('imageInput')
        // e clicar
        fileInput.click()
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }
    
    let profileMarkup = 
     (authenticated || handle 
        ? ( 
        <Paper className={classes.paper} style={{position: props.paperPosition}} > 
            <div className={classes.backgroundProfileImage} />
            
            <div className={classes.profile}>

            <div className={classes.imageWrapper}>
            
                <img className={classes.profileImage} src={imageUrl} alt="profile"></img>

                <input type="file" id="imageInput" onChange={handleImageChange} hidden="hidden"/>
                { authenticatedUser === handle && 
                    <MyButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
                        <EditIcon className={classes.iconProfile} />
                    </MyButton>
                }
            </div>
            <hr />

            <div className={classes.profileDetails}>

                {type !== "Usuario" 
                    ?   <MuiLink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                    :
                    <Typography variant="h5" style={{color: theme.mainColor}}>
                            @{handle}
                    </Typography>
                }
                
                <hr/>

                { bio && 
                    <div className={classes.userDescription}>
                    <PermIdentityIcon className={classes.iconProfile} />
                    <Typography variant="body2">
                         {bio}
                    </Typography>
                    <hr/>
                    </div>
                }

                { type !== "Usuario" && location && (
                    <div className={classes.userDescription}>
                        <LocationOn className={classes.iconProfile} /> <span>{location}</span>
                        <hr />
                    </div>
                )}

                { type !== "Usuario" && instagram && (
                    <div className={classes.userDescription} style={{alignItems: 'center'}}>
                        <LinkIcon className={classes.iconProfile} />
                        <a href={instagram} target="_blank" rel="noopener noreferrer">
                            {" "}{instagram}
                        </a>
                        <hr />
                    </div>
                )}

                {type !== "Usuario" && (
                     <div className={classes.userDescription}>
                        <HowToRegIcon className={classes.iconProfile}/>
                        <Typography variant="body2">Especializado em {category === "Ambos" ? "cabelo masculino e feminino" : category}</Typography>
                        <hr />
                    </div>
                )}

                {/* dia em que criou o perfil */}
                <div className={classes.userDescription} style={{alignItems: 'center', paddingBottom: 20}}>
                    <CalendarToday className={classes.iconProfile}/> 
                    {" "} <Typography variant="body2"> Registrado desde {dayjs(createdAt).format('MMM YYYY')}</Typography>
                </div>
                
                
            </div>

            { authenticatedUser === handle && 
            <Fragment>
                <MyButton tip="Logout" onClick={handleLogout}>
                    <KeyboardReturn className={classes.iconProfile} />
                </MyButton>
                {type !== "Usuario" && <EditDetails places={places} />}
                
            </Fragment>
            }

            </div>
        </Paper>
        ) : (
        // se nao esetiver autenticado...
        <Paper className={classes.paper} style={{position: 'fixed'}}>

            <Typography variant="body2" align="center">
                Nenhum perfil encontrado
            </Typography>

            {/* butao para logar ou se registrar */}
            <div className={classes.buttons}>
                <Button variant="contained" style={{backgroundColor: theme.mainColor, color: theme.fontMainColor}} component={Link} to="/login">Login
                </Button>
                <Button variant="contained" style={{backgroundColor: theme.secondaryColor, color: theme.fontMainColor}} component={Link} to="/signup">Sign up
                </Button>
            </div>

        </Paper>
        ))
        
    return profileMarkup
  
}

Profile.protoTypes = {
    userInfo: PropTypes.object.isRequired, // user data
    classes: PropTypes.object.isRequired, // styles
    logoutUser: PropTypes.func.isRequired, // function to logout usere
    uploadImage: PropTypes.func.isRequired, // function to upload new profile imagee
}

export default withStyles(styles)(Profile)

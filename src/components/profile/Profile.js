import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import theme from '../../utils/theme'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'

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


const styles = {
    paper: {
        backgroundColor: theme.backgroundColorMain,
        color: theme.fontMainColor,
        padding: 20,
        position: 'fixed'
    },
    iconProfile: {
        color: theme.secondaryColor
    },
    profile: {
    '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
        }
    },
    '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
        verticalAlign: 'middle'
        },
        '& a': {
        color: theme.mainColor
        }
    },
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
    buttons: {
    textAlign: 'center',
    '& a': {
        margin: '20px 10px'
    }
    }
    
}

function Profile(props) {

    const {classes} = props

    const {
        credentials: {handle, createdAt, imageUrl, bio, instagram, location, category},
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
    
    // todo, poder ver o perfil de outros usuarios sem estar logado
    
    // se nao estiver carregando os dados...
    let profileMarkup = 
    // verificar se esta autenticado
     (authenticated || handle 
        // se estiver...
        ? ( 
        // colocar o profile em um content 'Papeer'
        <Paper className={classes.paper} > 
            <div className={classes.profile}>

            {/* imagem do perfil content */}
            <div className="image-wrapper">

                {/* imagem */}
                <img className="profile-image" src={imageUrl} alt="profile"></img>

                {/* input para trocar de imagem */}
                <input type="file" id="imageInput" onChange={handleImageChange} hidden="hidden"/>
                { authenticatedUser === handle && 
                    <MyButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
                        <EditIcon className={classes.iconProfile} />
                    </MyButton>
                }
            </div>
            <hr />

            {/* detalhes do usuario */}
            <div className="profile-details">

                
                {/* link para o perfil dele */}
                {category !== "Usuario" 
                    ?   <MuiLink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                    :
                    <Typography variant="h5" style={{color: theme.mainColor}}>
                            @{handle}
                    </Typography>
                }
                
                <hr/>

                <Typography variant="body2">
                    <PermIdentityIcon className={classes.iconProfile} /> {bio}
                </Typography>

                <hr/>

                { category !== "Usuario" && location && (
                    <Fragment>
                        <LocationOn className={classes.iconProfile} /> <span>{location}</span>
                        <hr />
                    </Fragment>
                )}

                { category !== "Usuario" && instagram && (
                    <Fragment>
                        <LinkIcon className={classes.iconProfile} />
                        <a href={instagram} target="_blank" rel="noopener noreferrer">
                            {" "}{instagram}
                        </a>
                        <hr />
                    </Fragment>
                )}

                {category !== "Usuario" && (
                    <Fragment>
                        <span rel="noopener noreferrer">
                           Especializado em {category === "Ambos" ? "cabelo masculino e feminino" : category}
                        </span>
                        <hr />
                    </Fragment>
                )}

                {/* dia em que criou o perfil */}
                <CalendarToday className={classes.iconProfile}/> {" "} <span> Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                
            </div>

            { authenticatedUser === handle && 
            <Fragment>
                <MyButton tip="Logout" onClick={handleLogout}>
                    <KeyboardReturn className={classes.iconProfile} />
                </MyButton>

                <EditDetails places={places} />
            </Fragment>
            }

            </div>
        </Paper>
        ) : (
        // se nao esetiver autenticado...
        <Paper className={classes.paper}>

            <Typography variant="body2" align="center">
                No profile found, please login again
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

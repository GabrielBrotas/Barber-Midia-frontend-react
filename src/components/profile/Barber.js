import React, {Fragment} from 'react'
import theme from '../../utils/theme'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'

// MUI stuffs
import { Paper } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import PersonIcon from '@material-ui/icons/Person';
import RestoreIcon from '@material-ui/icons/Restore';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
    paper: {
        padding: 20,
        backgroundColor: theme.backgroundColorMain,
        color: theme.fontMainColor,
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
    },
    iconContent: {
        display: "flex",
        alignItems: 'center',
        marginBottom: '1rem'
    },
    iconImage: {
      color: theme.mainColor, 
      marginRight: "1rem",
      width: 40,
      height: 40,
    },
    message: {
        fontStyle: "italic"
    }
    
}

function Barber(props) {

    const {classes, barber} = props

    return (
        barber ?
            <Paper className={classes.paper} > 
                <div className={classes.profile}>

                {/* imagem do perfil content */}
                <div className="image-wrapper">
                    <img className="profile-image" src={barber.imageUrl} alt="profile"></img>
                </div>
                <hr />

                {/* detalhes do usuario */}
                <div className="profile-details">

                    {/* link para o perfil dele */}
                    <MuiLink style={{cursor: "pointer"}} color="primary" variant="h5">
                        @{barber.handle}
                    </MuiLink>
                    <hr/>

                    {/* bio... */}
                    {barber.bio && <Typography variant="body2">{barber.bio}</Typography>}
                    <hr/>

                    {/* localização... */}
                    {barber.location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{barber.location}</span>
                        <hr />
                        </Fragment>
                    )}

                    {/* url do site.. */}
                    {barber.instagram && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={barber.instagram} target="_blank" rel="noopener noreferrer">
                                {" "}{barber.instagram}
                            </a>
                            <hr />
                        </Fragment>
                    )}

                    {/* dia em que criou o perfil */}
                    <CalendarToday color="primary"/> {" "} <span> Joined {dayjs(barber.createdAt).format('MMM YYYY')}</span>
                    
                </div>

                </div>
            </Paper>
        : 
        <Fragment>
            <div className={classes.iconContent}>
            <PersonIcon className={classes.iconImage} />
            <Typography className={classes.iconDescription} component="h2" variant="h5">
                Selecione uma das opções no mapa para poder ver seus trabalhos e detalhes.
            </Typography>
            </div>

            <div className={classes.iconContent}>
            <RestoreIcon className={classes.iconImage} />
            <Typography className={classes.iconDescription} component="h2" variant="h5">
                Clique para voltar a sua localização atual.
            </Typography>
            </div>

            <div className={classes.iconContent}>
            <SearchIcon className={classes.iconImage} />
            <Typography className={classes.iconDescription} component="h2" variant="h5">
                Procure pelo lugar em que faz mais o seu estilo.
            </Typography>
            </div>

            <div style={{textAlign: "center", marginTop: "4rem"}}>
            <Typography className={classes.message} component="body1" variant="body1">
                Divirta-se !!!
            </Typography>
            </div>
            
            
        </Fragment>
        
    )

}



export default withStyles(styles)(Barber)

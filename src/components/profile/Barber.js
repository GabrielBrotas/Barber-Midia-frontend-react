import React, {useEffect, useState, Fragment} from 'react'
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


const styles = {
    paper: {
    padding: 20
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
        color: '#00bcd4'
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

function Barber(props) {

    const {classes, selectedUser} = props
    const [user, setUser] = useState(null)

    useEffect(() => {
        selectedUser.length > 0 && setUser(selectedUser[0])
    }, [selectedUser])

    return (
        user ?
        (<Paper className={classes.paper} > 
            <div className={classes.profile}>

            {/* imagem do perfil content */}
            <div className="image-wrapper">
                <img className="profile-image" src={user.imageUrl} alt="profile"></img>
            </div>
            <hr />

            {/* detalhes do usuario */}
            <div className="profile-details">

                {/* link para o perfil dele */}
                <MuiLink color="primary" variant="h5">
                    @{user.handle}
                </MuiLink>
                <hr/>

                {/* bio... */}
                {user.bio && <Typography variant="body2">{user.bio}</Typography>}
                <hr/>

                {/* localização... */}
                {user.location && (
                    <Fragment>
                        <LocationOn color="primary" /> <span>{user.location}</span>
                    <hr />
                    </Fragment>
                )}

                {/* url do site.. */}
                {user.instagram && (
                    <Fragment>
                        <LinkIcon color="primary" />
                        <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                            {" "}{user.instagram}
                        </a>
                        <hr />
                    </Fragment>
                )}

                {/* dia em que criou o perfil */}
                <CalendarToday color="primary"/> {" "} <span> Joined {dayjs(user.createdAt).format('MMM YYYY')}</span>
                
            </div>

            </div>
        </Paper>
        ) : (
            <p>loading...</p>
        ) 
    )

}



export default withStyles(styles)(Barber)

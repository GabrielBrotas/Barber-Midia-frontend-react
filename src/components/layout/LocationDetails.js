import React from 'react'
import theme from '../../utils/theme'

// MUI stuffs
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

// Icons
import PersonIcon from '@material-ui/icons/Person';
import RestoreIcon from '@material-ui/icons/Restore';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
    paper: {
        padding: 20,
        backgroundColor: theme.backgroundColorMain,
        color: theme.fontMainColor,
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

    const {classes} = props

    return (
        <div className={classes.paper}>
            <div className={classes.iconContent}>
            <PersonIcon className={classes.iconImage} />
            <Typography className={classes.iconDescription} component="h2" variant="h5">
                Selecione uma das opções no mapa para poder ver os trabalhos e detalhes.
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
            <Typography className={classes.message} component="p" variant="body1">
                Divirta-se !!!
            </Typography>
            </div>
            
        </div>
        
    )

}



export default withStyles(styles)(Barber)

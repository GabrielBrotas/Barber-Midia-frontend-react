import React from 'react'
import theme from '../../utils/theme'

import {useSelector, useDispatch} from 'react-redux'
import {deletePlaceDetail} from '../../redux/actions/dataActions'

import AddPlaceDetail from './AddPlaceDetail'

// MUI stuffs
import { Paper } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

// Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteOutline from '@material-ui/icons/DeleteOutline'

const styles = {
    paper:{ 
        backgroundColor: theme.backgroundColorMain,
        color: theme.fontMainColor,
        margin: 20,
        minWidth: 200,
    },
    detailsHeader:{ 
        paddingTop: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.backgroundColorMain,
        width: "80%",
        marginLeft: 'auto',
        marginRight: "auto"
    },
    HorizontalRow: {
        width: "100%",
        alignSelf: "center",
        height: ".1rem",
        borderBottom: "none"
    },
    detailsItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
    },
    iconTrue: {
        color: theme.mainColor,
        marginRight: '.4rem'
    },
    iconEdit: {
        color: theme.secondaryColor
    },
    deleteIcon: {
        marginLeft: 'auto',
        cursor: 'pointer'
    }
}

function ExtraDetails(props) {
    const {classes} = props
    const dispatch = useDispatch()
    
    const dataList = useSelector(state => state.data)
    const {place} = dataList

    const userInfo = useSelector(state => state.user)
    const {credentials: {handle}} = userInfo

    const handleDelete = (detail) => {
        if(window.confirm("Tem certeza que deseja deletar este item?")) {
            dispatch(deletePlaceDetail(place.placeId, detail))
        }
    }
    
    return(
    <Paper className={classes.paper}>
        { place.handle && handle ? (
            place.details.length > 0 ? (
                <>
                <div className={classes.detailsHeader}>
                    <Typography variant="h5" style={{marginRight: 'auto', marginLeft: 'auto'}}>Detalhes</Typography>
                    { place.handle === handle && <AddPlaceDetail className={classes.iconEdit} placeId={place.placeId} />}
                </div>
                <hr className={classes.HorizontalRow} />

                <div className={classes.detailsBody}>
                    { place.details.map( (detail, index) => (
                        <div key={index} className={classes.detailsItem}>
                        <CheckCircleIcon className={classes.iconTrue} />
                            {detail}
                
                            { place.handle === handle && <DeleteOutline className={classes.deleteIcon} color="secondary" onClick={() => handleDelete(detail)}/>}

                        </div>
                    ))}
                </div>
                </>
            ) : (
                <div className={classes.detailsHeader}>
                    <Typography variant="h5" style={{marginRight: 'auto', marginLeft: 'auto'}}>Sem Detalhes.</Typography>
                    { place.handle === handle && <AddPlaceDetail className={classes.iconEdit} placeId={place.placeId} />}
                </div>
            )
        ) : (
            <div className={classes.detailsHeader}>
                <Typography variant="h5">Loading...</Typography>
            </div>
        )
    }
</Paper>
)}

export default withStyles(styles)(ExtraDetails)

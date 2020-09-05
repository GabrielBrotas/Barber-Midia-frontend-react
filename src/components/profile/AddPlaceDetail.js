import React, {Fragment, useState, useEffect} from 'react'
import theme from '../../utils/theme'

import {useDispatch, useSelector} from 'react-redux'
import {clearErrors, addPlaceDetails} from "../../redux/actions/dataActions"

// components
import MyButton from '../../utils/MyButton'
import CssTextField from '../others/CssTextField'

// Material UI Stuffs
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withStyles from '@material-ui/core/styles/withStyles'

// icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = {
    paperTitle: {
        backgroundColor: theme.backgroundColorSecondary,
        color: theme.mainColor
    },
    paperContent: {
        backgroundColor: theme.backgroundColorSecondary,
        color: '#fff'
    },
    submitButton: {
        position: 'relative',
        backgroundColor: theme.mainColor,
        margin: '2rem 0',
        float: 'right',
        "&:hover": {
            backgroundColor: "#664608"
        }
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: "91%",
        top: "6%"
    },
    textField: {
        margin: "10px auto 10px auto"
    },
    iconWrap: {
        display: 'flex',
        justifyContent: 'center'
    },
    iconStyle: {
        cursor: "pointer"
    },
    uploadContent: {
        display: 'flex',
    }
}

function AddPlaceDetail(props) {
    const {classes, placeId} = props
    const dispatch = useDispatch()

    const UI = useSelector( state => state.UI)

    const [open, setOpen] = useState(false)
    const [detail, setDetail] = useState('')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        if(UI.errors){
            setErrors(
                UI.errors
            )
        }
        if(UI.loading) setLoading(true)
        if(!UI.errors && !UI.loading){
            setDetail('')
            setLoading(false)
            setOpen(false)
        }
    }, [UI])

    const handleClose = () => {
        setOpen(false)
        setLoading(false)
        setErrors({})
        dispatch(clearErrors())
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addPlaceDetails(placeId, detail))
    }
    
    return (
        <Fragment>

            <div className={classes.iconWrap} onClick={() => setOpen(true)}>
                <AddIcon className={classes.iconStyle}/>
            </div>

            <Dialog
            open={open}
            onClose={() => handleClose()}
            fullWidth
            maxWidth="sm"
            >
                <MyButton tip="Close" onClick={() => handleClose()} tipClassName={classes.closeButton}>
                    <CloseIcon style={{color: "#fff"}} />
                </MyButton>

                <DialogTitle className={classes.paperTitle}>
                    Adicionar Detalhes
                </DialogTitle>
                
                <DialogContent className={classes.paperContent}>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <CssTextField  
                        variant="filled"
                        margin="normal"
                        required
                        autoFocus
                        name="detail"
                        type="text"
                        label="Umac caracteristica do seu local"
                        placeholder="Digite algo. Exemplo: Wi-Fi, Ar-Condicionado, ..."
                        error={errors.body ? true : false}
                        helperText={errors.body}
                        className={classes.textField}
                        onChange={(e) => setDetail(e.target.value)}
                        fullWidth
                        />

                        <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            
        </Fragment>
    )
    
}

export default withStyles(styles)(AddPlaceDetail)
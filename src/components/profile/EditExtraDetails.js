import React, {Fragment, useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import theme from '../../utils/theme'

// components
import MyButton from '../../utils/MyButton'
import CssTextField from '../others/CssTextField'

// Material UI Stuffs
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

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

function EditExtraDetails(props) {

    const [open, setOpen] = useState(false)
    const [detail, setDetail] = useState('')
    const [errors, setErrors] = useState({})

    const {classes} = props
    const loading = false
    // useEffect( () => {
    //     if(props.UI.errors){
    //         setErrors(
    //             props.UI.errors
    //         )
    //     }
    //     if(!props.UI.errors && !props.UI.loading){
    //         setBodyText('')
    //         setOpen(false)
    //     }
    // }, [props])

    const handleClose = () => {
        setOpen(false)
        setErrors({})
        // props.clearErrors()
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
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
                    </form>

                    <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                        Submit
                    </Button>

                </DialogContent>
            </Dialog>
            
        </Fragment>
    )
    
}

export default withStyles(styles)(EditExtraDetails)
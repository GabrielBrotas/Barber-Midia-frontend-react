import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import MyButton from '../../utils/MyButton'
import CssTextField from '../others/CssTextField'

// redux
import {connect} from 'react-redux'
import {editUserDetails} from '../../redux/actions/userActions'

// Material UI Stuffs
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

// icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    paperTitle: {
        backgroundColor: theme.backgroundColorSecondary,
        color: theme.mainColor
    },
    paperContent: {
        backgroundColor: theme.backgroundColorSecondary,
        color: '#fff'
    },
    button: {
        float: "right"
    },
    buttonSubmit:{
        color: theme.mainColor,
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
       
    }
})

function EditDetails(props) {

    // estados onde ficarao os dados do usuario
    const [bio, setBio] = useState('')
    const [instagram, setInstagram] = useState('')
    const [open, setOpen] = useState(false)
    const {credentials, classes} = props

    useEffect( () => {
        mapUserDetailsToState(credentials)  
    }, [credentials])

    // colocar os dados do usuario logado no state
    const mapUserDetailsToState = (credentials) => {
        setBio(credentials.bio ? credentials.bio : '')
        setInstagram(credentials.instagram ? credentials.instagram : '')
    }

    // abrir o pop up
    const handleOpen = () => {
        setOpen(true)
        mapUserDetailsToState(props.credentials);
    }

    // fechar pop up
    const handleClose = () => {
        setOpen(false)
    }

    // salvar dados
    const handleSubmit = () => {
        const userDetails = {
            bio,
            instagram,
            category: credentials.category
        }
        // mandar para a action do user os novos dados para salvar
        props.editUserDetails(userDetails);
        // fechar pop up
        handleClose();
    }
    

    return (
        <Fragment>
            {/* butao para abrir o pop up */}
            <MyButton tip="Edit Details" btnClassName={classes.button} onClick={handleOpen}>
                <EditIcon color="primary"/>
            </MyButton>

            {/* caixa do pop up */}
            <Dialog 
            // estado
            open={open}
            onClose={handleClose}
            fullWidth
            
            // os tipos de width do dialog está na documentação do material ui
            maxWidth="sm">
                <DialogTitle className={classes.paperTitle}>Edit your Details</DialogTitle>

                <DialogContent className={classes.paperContent}>
                    <form>
                        {/* bio text */}
                        <CssTextField 
                        variant="filled"
                        margin="normal"
                        required
                        autoFocus
                        name="bio" 
                        type="text" 
                        label="Bio" 
                        multiline 
                        rows="3" 
                        placeholder="A short bio about yourself" 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        fullWidth 
                        />

                        {/* instagram text */}
                        <CssTextField 
                        variant="filled"
                        margin="normal"
                        required
                        name="instagram" 
                        type="text" 
                        label="Instagram"  
                        placeholder="your personal and professional instagram" 
                        value={instagram} 
                        onChange={(e) => setInstagram(e.target.value)} 
                        fullWidth 
                        />

                    </form>
                </DialogContent>

                <DialogActions className={classes.paperContent}>

                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} className={classes.buttonSubmit}>
                        Save
                    </Button>

                </DialogActions>

            </Dialog>
        </Fragment>
    )
}

EditDetails.protoTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

const mapActionsToProps = {editUserDetails}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails))

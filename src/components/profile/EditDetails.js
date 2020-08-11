import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import MyButton from '../../utils/MyButton'
import SelectForm from '../others/SelectForm'

// redux
import {connect} from 'react-redux'
import {editUserDetails} from '../../redux/actions/userActions'

// Material UI Stuffs
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

// icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    button: {
        float: "right"
    }
})

function EditDetails(props) {

    // estados onde ficarao os dados do usuario
    const [bio, setBio] = useState('')
    const [instagram, setInstagram] = useState('')
    const [category, setCategory] = useState('Usuario')
    const [open, setOpen] = useState(false)
    const {credentials, classes} = props

    useEffect( () => {
        mapUserDetailsToState(credentials)  
    }, [credentials])

    // colocar os dados do usuario logado no state
    const mapUserDetailsToState = (credentials) => {
        setBio(credentials.bio ? credentials.bio : '')
        setInstagram(credentials.instagram ? credentials.instagram : '')
        setCategory(credentials.category ? credentials.category : 'Usuario')
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
            category
        }
        // mandar para a action do user os novos dados para salvar
        // todo, salvar nova localização
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
                <DialogTitle>Edit your Details</DialogTitle>

                <DialogContent>
                    <form>
                        {/* bio text */}
                        <TextField 
                        name="bio" 
                        type="text" 
                        label="Bio" 
                        multiline 
                        rows="3" 
                        placeholder="A short bio about yourself" 
                        className={classes.textField} 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        fullWidth 
                        />

                        {/* instagram text */}
                        <TextField 
                        name="instagram" 
                        type="text" 
                        label="Instagram"  
                        placeholder="your personal and professional instagram" 
                        className={classes.textField} 
                        value={instagram} 
                        onChange={(e) => setInstagram(e.target.value)} 
                        fullWidth 
                        />

                        {/* category text */}
                        <SelectForm
                        name="category" 
                        label="Category"
                        category={category}
                        fontColor={"#000"}
                        onChangeSelect={setCategory} 
                        fullWidth 
                        />
                        

                    </form>
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} color="primary">
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

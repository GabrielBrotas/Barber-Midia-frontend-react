import React, {Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// components
import MyButton from '../../utils/MyButton'
import UploadButton from '../others/uploadButton'

// redux
import {connect, useDispatch} from 'react-redux'
import {publishPost, clearErrors} from '../../redux/actions/dataActions'

// Material UI Stuffs
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

// icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = {
    submitButton: {
        position: 'relative',
        margin: '1rem 0',
        float: 'right'
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
    }
}

function AddNewPost(props) {

    const [open, setOpen] = useState(false)
    const [bodyText, setBodyText] = useState('')
    const [imageToUpload, setImageToUpload] = useState({})
    const [errors, setErrors] = useState({})

    const {classes, UI: {loading}} = props

    useEffect( () => {
        if(props.UI.errors){
            setErrors(
                props.UI.errors
            )
        }
        if(!props.UI.errors && !props.UI.loading){
            setBodyText('')
            setOpen(false)
        }
    }, [props])

    const handleClose = () => {
        setOpen(false)
        setErrors({})
        props.clearErrors()
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.publishPost({bodyText, bodyImage: ""}, imageToUpload)
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
                    <CloseIcon />
                </MyButton>

                <DialogTitle>
                    Post new Scream
                </DialogTitle>
                
                
                <DialogContent>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <TextField 
                        name="body"
                        type="text"
                        label="Scream !!"
                        rows="2"
                        multiline
                        placeholder="type something"
                        error={errors.body ? true : false}
                        helperText={errors.body}
                        className={classes.textField}
                        onChange={(e) => setBodyText(e.target.value)}
                        fullWidth
                        />
                        
                        <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                            Submit
                            {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                        </Button>
                    </form>
                    <UploadButton takeImageToUpload={setImageToUpload} />
                </DialogContent>
            </Dialog>
            
        </Fragment>
    )
    
}

AddNewPost.propTypes = {
    publishPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

const mapActionsToProps = {
    publishPost,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddNewPost))
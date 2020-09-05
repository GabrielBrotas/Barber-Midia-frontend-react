import React, {Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import filesize from 'filesize'
import theme from '../../utils/theme'

// components
import MyButton from '../../utils/MyButton'
import UploadButton from '../others/UploadButton'
import CssTextField from '../others/CssTextField'
import SelectForm from '../others/SelectForm'
import {CircularProgressbar} from 'react-circular-progressbar'

// redux
import {connect, useSelector} from 'react-redux'
import {publishPost, clearErrors} from '../../redux/actions/dataActions'

// Material UI Stuffs
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

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
    uploadContent: {
        display: 'flex',
    }
}

function AddNewPost(props) {

    const [open, setOpen] = useState(false)
    const [bodyText, setBodyText] = useState('')
    const [imageToUpload, setImageToUpload] = useState({})
    const [imageToUploadData, setImageToUploadData] = useState({})
    const [errors, setErrors] = useState({})
    const {classes, UI: {loading, progress}} = props
    
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
        setImageToUploadData({})
        setImageToUpload({})
        props.clearErrors()
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        props.publishPost({bodyText, bodyImage: ""}, imageToUpload)
        setImageToUploadData({})
        setImageToUpload({})
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
                    Adicionar Post
                </DialogTitle>
                
                
                <DialogContent className={classes.paperContent}>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <CssTextField  
                        variant="filled"
                        margin="normal"
                        required
                        autoFocus
                        name="body"
                        type="text"
                        label="Texto breve"
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
                    
                    <div className={classes.uploadContent}>
                        <UploadButton setImageToUploadData={setImageToUploadData} takeImageToUpload={setImageToUpload} />
                        <CircularProgressbar
                        styles={{
                            root: {width: 24},
                            path: {stroke: theme.mainColor},
                        }}
                        strokeWidth={10}
                        value={progress}
                        />

                    </div>

                    {imageToUploadData.name &&
                        <Fragment>
                            <p><strong>Name: </strong>{imageToUploadData.name}</p>
                            <p><strong>Size: </strong>{filesize(imageToUploadData.size)}</p>
                        </Fragment>
                    }
                    

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
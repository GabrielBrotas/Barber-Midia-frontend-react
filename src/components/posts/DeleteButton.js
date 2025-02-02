import React, { Component, Fragment} from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../../utils/MyButton'

// MUI Stuffs
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

// redux
import {connect} from 'react-redux'
import {deletePost, deleteComment} from '../../redux/actions/dataActions'

const styles = {
    deleteButton: {
        marginLeft: 'auto'
    }
}


class DeleteButton extends Component {

    state = {
        open: false
    }
    
    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    deletePost = () =>{
        this.props.commentId
        ? this.props.deleteComment(this.props.commentId)
        : this.props.deletePost(this.props.postId)
        
        this.setState({open: false})
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <MyButton tip="Deletar" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
                    <DialogTitle>
                        Tem certeza que quer deletar este documento?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.deletePost} color="secondary">
                            Deletar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteButton.protoTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
}

const mapActionsToProps = {
    deletePost,
    deleteComment
}

export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteButton))
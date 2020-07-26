import React from 'react'
import {Link} from 'react-router-dom'
import MyButton from '../../utils/MyButton'
import PropTypes from 'prop-types'

// icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// redux
import {useDispatch} from 'react-redux'
import {likePost, unlikePost} from '../../redux/actions/dataActions'

function LikeButton(props)  {

    const {authenticated, likes} = props
    
    const dispatch = useDispatch()

    // verificar se a scream tem like
    const likedPost = () => {
        // se tiver um array de likes e achar um like para o id dessa scream retornar true
        if(likes && likes.find(like => like.postId === props.postId)){
            return true
        } else {
            return false
        }  
    }

    const likeThePost = (postId) => {
        dispatch(likePost(postId))
    }

    const unlikeThePost = (postId) => {
        dispatch(unlikePost(postId))
    }

    const likeButton = !authenticated ? (
        <Link to="/login">
        <MyButton tip="Like">
            <FavoriteBorder color="primary" />
        </MyButton>
        </Link>
    ) : (
        likedPost() ? (
            <MyButton tip="Undo Like" onClick={() => unlikeThePost(props.postId)}>
                <FavoriteIcon color="primary" />
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={() => likeThePost(props.postId)}>
                <FavoriteBorder color="primary" />
            </MyButton>
        )
    )
        
    return likeButton;
    
}

LikeButton.prototype = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeTheScream: PropTypes.func.isRequired,
}



export default LikeButton

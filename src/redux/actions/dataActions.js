import axios from 'axios'
import {GET_POSTS_SUCCESS, GET_POSTS_ERROR, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, SET_ERRORS, PUBLISH_POST, CLEAR_ERRORS, LOADING_UI, UPLOADING_PROGRESS, GET_POST_SUCCESS, STOP_LOADING_UI, SUBMIT_COMMENT, GET_PLACES, GET_ALL_COMMENTS} from '../types'


export const getPosts = () => (dispatch) => {
    dispatch({type: LOADING_DATA})
    // pegar todas as POSTs na api, foi definida a url da api no package.json em 'proxy'
    axios.get('/posts')
    .then( res => {
        dispatch({type: GET_POSTS_SUCCESS, payload: res.data})
    })
    .catch( err => {
        console.log(err)
        dispatch({type: GET_POSTS_ERROR})
    })
}

export const saveLocation = (data) => (dispatch) => {
    axios.post('/savelocation', data)
    .then( () => {
        dispatch(getAllPlaces())
    })
    .catch( err => {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const getAllPlaces = () => (dispatch) => {
    
    dispatch({type: LOADING_DATA});

    axios.get('/places')
    .then( res => {
        dispatch({type: GET_PLACES, payload: res.data})
    })
}

export const editPlace = (placeId, placeData) => (dispatch) => {

    axios.post('/editlocation/' + placeId, placeData)
        .then(res => {
            dispatch(getAllPlaces())
        })
        .catch( err => console.log(err))
}

export const deletePlace = (placeId) => (dispatch) => {

    axios.post('/deletelocation/' + placeId)
        .then(res => {
            dispatch(getAllPlaces())
        })
        .catch( err => console.log(err))
}

// like a POST
export const likePost = (postId) => dispatch => {   
    axios.get(`/post/${postId}/like`)
        .then( res => {
            dispatch({type: LIKE_POST, payload: res.data})
        })
        .catch( err => {
            console.log(err)
        })
}

// unlike POST
export const unlikePost = (postId) => dispatch => {  

    axios.get(`/post/${postId}/unlike`)
        .then( res => {
            dispatch({type: UNLIKE_POST, payload: res.data})
        })
        .catch( err => {
            console.log(err)
        })
}

// publish POST
export const publishPost = (newPost, imageToUpload) => dispatch => {
    dispatch({type: LOADING_UI})
    axios.post('/post', newPost)
        .then( (res) => {
            dispatch(uploadPostPicture(imageToUpload, res.data))
        })
        .catch( err => {
            console.log(err)
            dispatch({type: SET_ERRORS, payload: err.response.data})
        })
}

export const uploadPostPicture = (formData, post) => (dispatch) => {
    
    axios.post(`/post/image/${post.postId}`, formData, {
        onUploadProgress: e => {
            const progress = parseInt(Math.round( (e.loaded * 100) / e.total ))
            dispatch({type: UPLOADING_PROGRESS, payload: progress})

            if(progress === 100) dispatch({ type: PUBLISH_POST, payload: post})
        }})
    .then( () => {
        dispatch(getPosts())
        dispatch(clearErrors())
    })
    .catch( (err) => console.log(err))
    
}

export const getPost = (postId) => (dispatch) => {
    dispatch({type: LOADING_UI})

    axios.get(`/post/${postId}`)
        .then( res => {
            dispatch({type: GET_POST_SUCCESS, payload: res.data})
            dispatch({type: STOP_LOADING_UI})
        })
        .catch( err => console.log(err))
}

export const getAllComments = () => (dispatch) => {
    dispatch({type: LOADING_UI})

    axios.get(`/comments`)
        .then( res => {
            dispatch({type: GET_ALL_COMMENTS, payload: res.data})
            dispatch({type: STOP_LOADING_UI})
        })
        .catch( err => console.log(err))
}

export const submitComment = (postId, bodyText) => (dispatch) => {
    axios.post(`/post/${postId}/comment`, bodyText)
        .then( res => {
            dispatch({type: SUBMIT_COMMENT, payload: res.data})
            dispatch(clearErrors())
        })
        .catch( err => {
            console.log(err)
            dispatch({type: SET_ERRORS, payload: err.response})
        })
}

export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/post/${postId}`)
        .then( () => {
            dispatch({type: DELETE_POST, payload: postId})
        })
        .catch(err=> console.log(err))
}

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA})
    axios.get(`/user/${userHandle}`)
        .then( res => {
            // pegar as POSTs do user
            dispatch({type: GET_POSTS_SUCCESS, payload: res.data})
        })
        .catch( () => {
            dispatch({type: GET_POSTS_SUCCESS, payload: null})
        })
}
export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}
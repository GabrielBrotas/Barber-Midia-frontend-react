import axios from 'axios'
import {GET_POSTS_SUCCESS, GET_POSTS_ERROR, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, SET_ERRORS, PUBLISH_POST, CLEAR_ERRORS, LOADING_UI, GET_POST_SUCCESS, STOP_LOADING_UI, SUBMIT_COMMENT} from '../types'


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

// // like a POST
// export const likePOST = (POSTId) => dispatch => {   

//     axios.get(`/POST/${POSTId}/like`)
//         .then( res => {

//             dispatch({type: LIKE_POST, payload: res.data})
//         })
//         .catch( err => {
//             console.log(err)
//         })
// }
// // unlike POST
// export const unlikePOST = (POSTId) => dispatch => {  

//     axios.get(`/POST/${POSTId}/unlike`)
//         .then( res => {
//             dispatch({type: UNLIKE_POST, payload: res.data})
//         })
//         .catch( err => {
//             console.log(err)
//         })
// }

// // post POST
// export const postPOST = (newPOST) => dispatch => {
//     dispatch({type: LOADING_UI})

//     axios.post('/POST', newPOST)
//         .then( res => {
//             dispatch({ type: POST_POST, payload: res.data})
//             dispatch(clearErrors())
//         })
//         .catch( err => {
//             dispatch({type: SET_ERRORS, payload: err.response.data})
//         })
// }

// export const getPOST = (POSTId) => (dispatch) => {
//     dispatch({type: LOADING_UI})
//     axios.get(`/POST/${POSTId}`)
//         .then( res => {
//             dispatch({type: GET_POST_SUCCESS, payload: res.data})
//             dispatch({type: STOP_LOADING_UI})
//         })
//         .catch( err => console.log(err))
// }

// export const submitComment = (POSTId, commentData) => (dispatch) => {
//     axios.post(`/POST/${POSTId}/comment`, commentData)
//         .then( res => {
//             dispatch({type: SUBMIT_COMMENT, payload: res.data})
//             dispatch(clearErrors())
//         })
//         .catch( err => {
//             dispatch({type: SET_ERRORS, payload: err.response.data})
//         })
// }

// export const deletePOST = (POSTId) => (dispatch) => {
//     axios.delete(`/POST/${POSTId}`)
//         .then( () => {
//             dispatch({type: DELETE_POST, payload: POSTId})
//         })
//         .catch(err=> console.log(err))
// }

// export const getUserData = (userHandle) => (dispatch) => {
//     dispatch({type: LOADING_DATA})
//     axios.get(`/user/${userHandle}`)
//         .then( res => {
//             // pegar as POSTs do user
//             dispatch({type: GET_POSTS_SUCCESS, payload: res.data.POSTs})
//         })
//         .catch( () => {
//             dispatch({type: GET_POSTS_SUCCESS, payload: null})
//         })
// }
// export const clearErrors = () => (dispatch) => {
//     dispatch({type: CLEAR_ERRORS});
// }
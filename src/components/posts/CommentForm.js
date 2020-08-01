import React, {useState, useEffect} from 'react';
import MyButton from '../../utils/MyButton'
import theme from '../../utils/theme'
// Redux
import {useDispatch, useSelector} from 'react-redux'
import {submitComment} from '../../redux/actions/dataActions'

// MUI
import { makeStyles } from '@material-ui/core/styles';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white'
    },
    label: {
    textTransform: 'capitalize',
    color: "#fff"
    },
    margin: {
        marginBottom: '2rem'
    },
    formContent: {
        display: 'flex',
        color:"#fff"
    },
    imageContent: {
        alignSelf: 'center',
        textAlign: 'center',
        margin: '1.5rem 1rem'
    },
    commentImage: {
        maxWidth: '100%',
        height: 30,
        objectFit: 'cover',
        borderRadius: '50%',
        color:"#fff" 
    }
}));

export default function InputWithIcon(props) {

    const {postId, comments, expanded} = props
    const UI = useSelector( state => state.UI)

    const [bodyText, setBodyText] = useState('')
    const [errors, setErrors] = useState({})
    const classes = useStyles();
    const dispatch = useDispatch()
    const {imageUrl} = props

    
    useEffect( () => {
        if(UI.errors){
            setErrors(UI.errors)
        }
        if(!UI.errors && !UI.loading){
            setBodyText('')
        }
        
    }, [UI])

    useEffect( () => {
        setErrors({})
        if(!expanded) {
            setErrors({})
        } 
    }, [comments, expanded])

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(submitComment(postId, {bodyText}))
    }

    return (
        <div className={classes.formContent}  >

        <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Comentar no post"
        fullWidth
        value={bodyText}
        onChange={e => setBodyText(e.target.value)}
        error={errors.comment ? true : false}
        helperText={errors.comment}
        InputProps={
            {startAdornment: (
            <InputAdornment position="start" className={classes.imageContent}>
                <img src={imageUrl} alt="profile" className={classes.commentImage}/>
            </InputAdornment>
            )  
            }
        } 
        />

        
        <MyButton tip="Send" btnClassName="button" onClick={handleSubmit}>
            <SendIcon style={{ color: theme.mainColor}} />
        </MyButton>

        </div>
    );
}

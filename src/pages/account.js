import React, {useEffect, useState, Fragment} from 'react'
import theme from '../utils/theme'

import Table from '../components/others/Table'
import CssTextField from '../components/others/CssTextField'
import Search from '../components/others/Search'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {getAllPlaces, editPlace} from '../redux/actions/dataActions'

const styles = {
    formControl: {
        maxWidth: 300,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "2rem"
    },
    buttons: {
        marginTop: "1rem",
        display: 'flex',
        justifyContent: 'space-around'
    },
    submitButton: {
        backgroundColor: theme.mainColor,
        color: theme.fontMainColor,
        "&:hover": {
            backgroundColor: "#664608"
        }
    }
}


function Account(props) {

    const userInfo = useSelector(state => state.user)
    const {credentials: {handle}} = userInfo

    const dataInfo = useSelector(state => state.data)
    const {loading} = dataInfo

    const {classes} = props
    const [openModal, setOpenModal] = useState(false)
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState({})
    
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(getAllPlaces())
    }, [dispatch])

    const handleSubmit = () => {
        dispatch(editPlace(id, {...location, title}))
    }

    return (
        !loading ?(
            <Fragment>
            {openModal &&
                <div className={classes.formControl}>
                    <CssTextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Nome do estabelecimento"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    //   helperText={errors.handle} error={errors.handle ? true : false}
                    />

                    <Search oldLocation={location} setLocation={setLocation} />
                    
                    <div className={classes.buttons}>
                        <Button 
                        className={classes.submitButton}
                        variant="contained" 
                        onClick={() => handleSubmit()}
                        >
                            Submit
                        </Button>
                        <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            }
                
                <Table handle={handle} setOpenModal={setOpenModal} setLocation={setLocation} setTitle={setTitle} setId={setId} />
            </Fragment>

        ) : (
            <p>loading...</p>
        )
    )
}

export default withStyles(styles)(Account)
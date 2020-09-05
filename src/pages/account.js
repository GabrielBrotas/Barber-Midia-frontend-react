import React, {useEffect, useState, Fragment} from 'react'
import theme from '../utils/theme'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import SelectForm from '../components/others/SelectForm'
import Search from '../components/others/Search'
import Table from '../components/others/Table'
import CssTextField from '../components/others/CssTextField'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {getAllPlaces, editPlace, saveLocation} from '../redux/actions/dataActions'

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
    },
    addButton: {
        backgroundColor: theme.mainColor,
        color: theme.fontMainColor,
        "&:hover": {
            backgroundColor: "#664608"
        },
        marginBottom: "1rem"
    }
}


function Account(props) {

    const userInfo = useSelector(state => state.user)
    const {credentials: {handle}} = userInfo

    const dataInfo = useSelector(state => state.data)
    const {loading, places} = dataInfo

    const {classes} = props
    const [openModal, setOpenModal] = useState(false)
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState({})
    const [category, setCategory] = useState('Cabelo Masculino')

    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(getAllPlaces())
    }, [dispatch])

    const handleSubmit = () => {
        if(id){
            dispatch(editPlace(id, {...location}))
        } else {
            dispatch(saveLocation({...location, category, handle}))
        }
        dispatch(getAllPlaces())
        setOpenModal(false)
    }

    return (
        !loading ?(
            <Fragment>
    
            {!openModal ? (
                <Button 
                className={classes.addButton}
                variant="contained" 
                onClick={() => setOpenModal(true)}
                >
                    Adicionar novo estabelecimento
                </Button>
            ) : (
                <div className={classes.formControl}>

                    {!id && 
                    <SelectForm 
                    onChangeSelect={setCategory} 
                    category={category}
                    backgroundColor="#fff"
                    />}

                    <Search oldLocation={location || " "} setLocation={setLocation}/>
                    
                    <div className={classes.buttons}>
                        <Button 
                        className={classes.submitButton}
                        variant="contained" 
                        onClick={() => handleSubmit()}
                        >
                            { id ? "Editar" : "Adicionar"}
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
            )}
                
            <Table places={places} handle={handle} setOpenModal={setOpenModal} setLocation={setLocation} setTitle={setTitle} setId={setId} />

            </Fragment>

        ) : (
            <p>loading...</p>
        )
    )
}

export default withStyles(styles)(Account)
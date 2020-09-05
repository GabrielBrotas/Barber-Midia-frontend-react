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
    const [location, setLocation] = useState({})
    const [category, setCategory] = useState('')
    const categories = ['Cabelo Masculino', 'Cabelo Feminino', 'Ambos']

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getAllPlaces())
    }, [dispatch])

    const handleSubmit = () => {
        dispatch(editPlace(id, {...location, category}))
        dispatch(getAllPlaces())
        setOpenModal(false)
    }

    return (
        !loading ?(
            <Fragment>
    
            {openModal &&
                <div className={classes.formControl}>
                    <SelectForm
                    onChangeSelect={setCategory} 
                    value={category} 
                    options={categories} 
                    title="Categoria"
                    />

                    <Search oldLocation={location || " "} setLocation={setLocation}/>
                    
                    <div className={classes.buttons}>
                        <Button 
                        className={classes.submitButton}
                        variant="contained" 
                        onClick={() => handleSubmit()}
                        >
                            Editar
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
                
            <Table places={places} handle={handle} setOpenModal={setOpenModal} setLocation={setLocation} setId={setId} setCategory={setCategory}/>

            </Fragment>

        ) : (
            <p>loading...</p>
        )
    )
}

export default withStyles(styles)(Account)
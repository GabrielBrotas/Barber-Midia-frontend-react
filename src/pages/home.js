// * libraries
import React, { useState, useEffect } from 'react'
// criar colunas
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

// redux
import {useDispatch, useSelector} from 'react-redux'
import {getPosts} from '../redux/actions/dataActions'

// * components
import PostContent from '../components/PostContent'
import Profile from '../components/Profile'

function Home(props) {

    const dataList = useSelector(state => state.data)
    const {loading, posts} = dataList

    const [allPostsInDB, setAllPostsInDB] = useState(null)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getPosts())
    }, [dispatch])

    useEffect( () => {
        !loading &&
        setAllPostsInDB(
            posts.map( (post) => (
                <PostContent key={post.postId} scream={post} />
            )))
    
    }, [dataList, loading, posts])
    return (
        // todo, posts skeletor while loading
        loading ? <p>loading...</p> :
        // display grid que vai ser o container (pai) e dentro vai ter a quantidade de grids(colunas) que quere com a largura que cada um vai ocupar
        <Grid container spacing={4}>
            
            {/* coluna das screams */}
            <Grid item sm={8} xs={12}>
               {allPostsInDB}
            </Grid>

            {/* coluna do perfil do usuario */}
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
            
        </Grid>
    )
    
}

// verificar os campos e validar o tipo e outros dados
Home.protoTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
}

export default Home


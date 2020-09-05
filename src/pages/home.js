// * libraries
import React, { useState, useEffect } from 'react'

// criar colunas
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

// redux
import {useDispatch, useSelector} from 'react-redux'
import {getPosts, getAllPlaces} from '../redux/actions/dataActions'


// * components
import PostContent from '../components/posts/PostContent'
import Profile from '../components/profile/Profile'
import PostSkeleton from '../components/posts/PostSkeleton'
import ProfileSkeleton from '../components/profile/ProfileSkeleton'

function Home(props) {
    const dataList = useSelector(state => state.data)
    const {loading, posts} = dataList

    const userInfo = useSelector(state => state.user)
    const {credentials, likes, authenticated} = userInfo

    const [allPostsInDB, setAllPostsInDB] = useState(null)

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getPosts())
        dispatch(getAllPlaces())
    }, [dispatch])

    useEffect( () => {
        !loading ?
        setAllPostsInDB(
            posts.map( (post) => (
                <PostContent key={post.postId} post={post} likes={likes} authenticated={authenticated} handle={credentials.handle} imageUrl={credentials.imageUrl} />
            )))
        : setAllPostsInDB(<p>loading</p>)
    
    }, [dataList, loading, posts, likes, authenticated, credentials.handle, credentials.imageUrl])
    
    return (
        loading || userInfo.loading ? <Grid container spacing={4}>
            
        {/* coluna das screams */}
        <Grid item sm={8} xs={12}>
           <PostSkeleton />
        </Grid>

        {/* coluna do perfil do usuario */}
        <Grid item sm={4} xs={12}>
            <ProfileSkeleton />
        </Grid>
        
    </Grid> :
        // display grid que vai ser o container (pai) e dentro vai ter a quantidade de grids(colunas) que quere com a largura que cada um vai ocupar
        <Grid container spacing={4}>
            
            {/* coluna das screams */}
            <Grid item sm={8} xs={12}>
               {allPostsInDB}
            </Grid>

            {/* coluna do perfil do usuario */}
            <Grid item sm={4} xs={12} style={{ contain: 'content'}}>
                <Profile authenticatedUser={credentials.handle} credentials={credentials} authenticated={authenticated} paperPosition="fixed"/>
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
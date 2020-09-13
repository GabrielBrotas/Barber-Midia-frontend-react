// * libraries
import React, { useEffect } from 'react'

// criar colunas
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

// redux
import {useDispatch, useSelector} from 'react-redux'
import {getPosts, getAllPlaces} from '../redux/actions/dataActions'


// * components
import PostContent from '../components/Posts/PostContent'
import Profile from '../components/Profile/Profile'
import PostSkeleton from '../components/Posts/PostSkeleton'
import ProfileSkeleton from '../components/Profile/ProfileSkeleton'

function Home() {
    const dataList = useSelector(state => state.data)
    const {loading, posts} = dataList

    const userInfo = useSelector(state => state.user)
    const {credentials, likes, authenticated} = userInfo

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getPosts())
        dispatch(getAllPlaces())
    }, [dispatch])
    
    return (
        loading || userInfo.loading ? (
        <Grid container spacing={4}>
            
            <Grid item sm={8} xs={12}>
                {[0,1,2,3,4].map( index => (
                    <PostSkeleton key={index} />
                ))}
            </Grid>

            <Grid item sm={4} xs={12}>
                <ProfileSkeleton />
            </Grid>
        
        </Grid>
    ) : (
        <Grid container spacing={4} style={{height: '100%'}}>
            
            <Grid item sm={8} xs={12}>
                {posts.map( post => (
                <PostContent key={post.postId} post={post} likes={likes} authenticated={authenticated} handle={credentials.handle} imageUrl={credentials.imageUrl} />
                ))}
            </Grid>

            <Grid item sm={4} style={{ padding: 0}}>
                <Profile authenticatedUser={credentials.handle} credentials={credentials} authenticated={authenticated} paperPosition="fixed"/>
            </Grid>
            
        </Grid>)
    )
    
}

Home.protoTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    likes: PropTypes.array.isRequired,
    authenticated: PropTypes.bool.isRequired,
    credentials: PropTypes.object.isRequired,
}

export default Home
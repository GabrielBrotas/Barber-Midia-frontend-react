import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


const NotAuthRoute = ({component: Component, authenticated, ...rest}) => {
    return (
    <Route 
        {...rest}

        render={(props) => authenticated === true 
            ? <Redirect to="/" />
            : <Component {...props} />
        }
    />
)}

NotAuthRoute.prototype = {
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NotAuthRoute)
import React ,{Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../api/index'

//To check whether user is Authenticated or not
const PrivateRoute = ({component: Component , ...rest}) => (
    //props means components passed to this private route component
    <Route {...rest} render={props => isAuthenticated() ? (
        <Component {...props} />
    ) : (
        <Redirect to={{pathname: "/signin", state:{from: props.location}}} /> 
    )} />
)

export default PrivateRoute;
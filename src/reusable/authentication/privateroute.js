import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from './auth'


export default function Privateroute({component: RouterComponent, ...rest}) {
    const currUser = useContext(AuthContext)
    console.log(currUser)

    return (
        <Route {...rest} render={
            routeProps => currUser!=null? <RouterComponent {...routeProps}/>:<Redirect to={'/login'} />
        } />
    )
}

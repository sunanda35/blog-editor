import React, {useState, useContext} from 'react'
import './header.css'
import {title} from '../../production/Strings'
import { Link, Redirect } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import {auth} from '../../production/firebase'

function Header({history}) {
    // const [photo, setPhoto] = useState()
    // const currUser = useContext(AuthContext);
    const signouthandle = ()=>{
        auth.signOut().then(()=>{
            return <Redirect to='/login'/>
        }).catch(err=> alert(err.message))
        return <Redirect to='/login' />
    }

    return (
        <div>
            <div id="head" className='header'>
            <div className='header_left'>
            <Link className='li' to='/'><h1 className='header_logo'>{title}</h1></Link>
            </div>

            <div className='header_right'>
                <div className='header_icon_container'>
                    <button onClick={signouthandle}><Avatar className='h_avatar' src='https://avatars3.githubusercontent.com/u/46472626?s=400&u=fbdf983ebbbed39b396e12718971d582c123d7f3&v=4' alt='author-photo' /></button>
                </div>
            </div>
            </div>
            
        </div>
    )
}



export default Header

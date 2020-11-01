import React, {useState, useEffect} from 'react'
import './header.css'
import {title} from '../../production/Strings'
import { Link, Redirect } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import {auth} from '../../production/firebase'

function Header({history}) {
    // const [photo, setPhoto] = useState()
    const [curr, setCurr] = useState()

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setCurr(user)
            }else{
                history.push('/login')
            }
        })
    })


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
                    <h3>New Draft</h3>
                    {
                        curr?<button onClick={signouthandle}><Avatar className='h_avatar' src='https://avatars3.githubusercontent.com/u/46472626?s=400&u=fbdf983ebbbed39b396e12718971d582c123d7f3&v=4' alt='author-photo' /></button>:<p>login</p>
                    }
                </div>
            </div>
            </div>
            
        </div>
    )
}



export default Header

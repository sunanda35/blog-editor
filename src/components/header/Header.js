import React, {useState} from 'react'
import './header.css'
import SearchIcon from '@material-ui/icons/Search'
import {title} from '../../production/Strings'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

function Header({url}) {
    const [value, setValue] = useState()

    return (
        <div>
            <div id="head" className='header'>
            <div className='header_left'>
            <Link className='li' to='/'><h1 className='header_logo'>{title}</h1></Link>
            </div>

            <div className='header_right'>
                <div className='header_icon_container'>
                    <Avatar className='h_avatar' src='https://avatars3.githubusercontent.com/u/46472626?s=400&u=fbdf983ebbbed39b396e12718971d582c123d7f3&v=4' alt='author-photo' />
                </div>
            </div>
            </div>
            
        </div>
    )
}



export default Header

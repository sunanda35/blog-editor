import React, {useState} from 'react'
import './header.css'
import SearchIcon from '@material-ui/icons/Search'
import {title} from '../../production/Strings'
import { Link } from 'react-router-dom'

function Header() {
    const [value, setValue] = useState()

    return (
        <div id="head" className='header'>
            <div className='header_left'>
            <Link className='li' to='/'><h1 className='header_logo'>{title}</h1></Link>
            </div>

            <div className='header_right'>
                <div id='input'>
                    <input placeholder="Search here" onChange={e=>setValue(e.target.value)} type='text'/>
                    <SearchIcon fontSize='medium' onClick={event =>  window.location.href=`/search/find=${value}`} className='header_search'/>
                </div>
                <div className='header_icon_container'>
                    <h4 onClick={'fuck off'} className='header_icons header_write'>Write here</h4>
                </div>
            </div>
        </div>
    )
}



export default Header

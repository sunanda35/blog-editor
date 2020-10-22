import React from 'react'
import {title, err_tag,err_down_tag} from '../../production/Strings'
import Header from '../../components/header/Header'
import './error.css'
import Footer from '../../components/footer/Footer'

function Error() {
    return (
        <div>
            <Header/>
            <div className='err'>
            <h1 className='er404'>404</h1>
            <h1 className='ertag'>{err_tag}</h1>
            <p className='er_down_tag'>{err_down_tag}</p>
            <div className='eritems'>
                <ul>
                    <li >Homepage</li>
                    <li >·</li>
                    <li >Start Writing</li>
                    <li >·</li>
                    <li >Get Support</li>
                </ul>
            </div>
            <div className='ersearch'>
                <input type='text' placeholder={'Search '+title} />
                <p>Search</p>
            </div>
            <p className='btchannel'>Back to the Channel!</p>
            </div>
            <Footer/>
        </div>
    )
}

export default Error
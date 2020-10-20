import React from 'react'
import './footer.css'
import { LinkedIn, Facebook, Twitter, Reddit, Pinterest, Instagram } from '@material-ui/icons';


function Footer() {
    return (
        <div className='footer'>
            <div className='footer_left'>
                <ul>
                    <li>Help</li>
                    <li>Status</li>
                    <li>Writer</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>Cookies</li>
                    <li>Contact us</li>
                    <li>About</li>
                </ul>
            </div>
            <div className='footer_right'>
                <ul>
                    <li><LinkedIn fontSize='medium' className='ficon'/></li>
                    <li><Facebook fontSize='medium' className='ficon'/></li>
                    <li><Twitter fontSize='medium' className='ficon'/></li>
                    <li><Reddit fontSize='medium' className='ficon'/></li>
                    <li><Pinterest fontSize='medium' className='ficon'/></li>
                    <li><Instagram fontSize='medium' className='ficon'/></li>
                </ul>    
            </div>
        </div>
    )
}

export default Footer

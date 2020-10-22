import React from 'react'
import './Draft.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

export default function Draft() {
    return (
        <div>
            <Header/>
            <div className='draft_h'>
                <div className='draft_h_t'>
                    <div className='d_h_t_t'>
                    <p>Save</p>
                    <SaveOutlinedIcon className='icn' />
                    </div>
                    <div className='d_h_t_t'>
                    <p>Submit</p>
                    <PublishOutlinedIcon className='icn' />
                    </div>
                </div>
            </div>
            <div className='draft'>
                <input className='d_title' type='text' placeholder='Title' rows='2' maxLength='100' />
                {/* <textarea className='d_title' rows='2' placeholder='Title' maxLength='100'></textarea> */}
                <div contentEditable></div>
            </div>
            <Footer/>
        </div>
    )
}

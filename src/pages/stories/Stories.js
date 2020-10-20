import React, {useState} from 'react'
import './stories.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Draft from './draft/Draft'
import Publish from './publish/Publish'

function Stories() {
    const [select, setSelect] = useState(true)
    
    return (
        <div>
            <Header/>
            <div className='stories_header'>
            <div className='stories_h'>
                <p className={select? 's_t_p':null} onClick={()=> setSelect(true)}>Draft</p>
                <p className={select? null:'s_t_p'} onClick={()=>setSelect(false)}>Publish</p>
            </div>
            </div>
            <div className='stories_b'>
                {
                    select? <Draft/>:<Publish/>
                }
            </div>
            <Footer/>
        </div>
    )
}

export default Stories

import React, {useState, useEffect} from 'react'
import './stories.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Draft from './draft/Draft'
import Publish from './publish/Publish'
import {auth} from '../../production/firebase'
import Cload from '../../reusable/loading/Load'

function Stories({history}) {
    const [select, setSelect] = useState(true)
    const [currUser, setCurrUser] = useState()

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setCurrUser(user)
            }else{
                history.push('/login')
            }
        })
    })

    
    if(!currUser) return <Cload/>
    else return (
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
                    select? <Draft userID={currUser.uid} />:<Publish userID={currUser.uid} />
                }
            </div>
            <Footer/>
        </div>
    )
}

export default Stories

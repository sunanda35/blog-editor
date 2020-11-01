import React, {useState, useEffect} from 'react'
import './header.css'
import {title, oUrl} from '../../production/Strings'
import { Link, Redirect } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import {auth,db} from '../../production/firebase'

function Header({history}) {
    // const [photo, setPhoto] = useState()
    const [curr, setCurr] = useState()
    const [dropdown, setDropdown] = useState(false)
    const [profImg, setProfImg] = useState()
    const [uName, setUName] = useState()

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setCurr(user)
            }else{
                history.push('/login')
            }
        })
    })
    useEffect(()=>{
        curr && db.collection('author').doc(curr.uid).get().then(response=>{
            setProfImg(response.data().img)
            setUName(response.data().userName)
        }).catch(err=>alert(err.message))
    },[curr])

    const profile = ()=>{
        // window.location.replace('https://google.com')
        window.open(`${oUrl}/author/${uName}`,'_blank')
    }
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
                <Link className='draft_li' to='/draft'><h3>New Draft</h3></Link>
                    {
                        curr?<Avatar onClick= {e=>setDropdown(!dropdown)}  className='h_avatar' src={profImg?profImg:'https://avatars3.githubusercontent.com/u/46472626?s=400&u=fbdf983ebbbed39b396e12718971d582c123d7f3&v=4'} alt='author-photo' />:<p>login</p>
                    }
                </div>
            {
                dropdown?<div className='dropdown'>
                    <h3>sf</h3>
                    
                    {
                        uName?<p onClick={profile} >{uName}</p>:<p>Profile</p>
                    }
                <p><Link className='dropdown_li' to='/editurprofile'>Edit Profile</Link></p>
                <p><Link className='dropdown_li' to='/stories'>Dashboard</Link></p>
                <p><Link className='dropdown_li' to='/stat'>Stats</Link></p>
                <p>About</p>
                <p onClick={signouthandle}>Log Out</p>
                </div>:null
            }
            </div>
            </div>
            
        </div>
    )
}



export default Header

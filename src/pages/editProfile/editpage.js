import React, {useState, useEffect, useContext} from 'react'
import './editpage.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import {AuthContext} from '../../reusable/authentication/auth'
import {db} from '../../production/firebase'
import {auth} from '../../production/firebase'
import Cload from '../../reusable/loading/Load'
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Editpage({history}) {
    const currUser = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const [uName, setUName] = useState()
    const [name, setName] = useState()
    const [uImage, setUImage] = useState()
    const [uBio, setUBio] = useState()
    const [linkdIN, setLinkdIN] = useState()
    const [twit, setTwit] = useState()
    const [git, setGit] = useState()

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setLoading(false)
            }else{
                history.push('/login')
            }
        })
    })

    useEffect(()=>{
        currUser && db.collection("author").doc(currUser.uid).get().then((response)=>{
            setUName(response.data().userName)
            setName(response.data().name)
            setUImage(response.data().img)
            setUBio(response.data().bio)
            setLinkdIN(response.data().bio)
            setTwit(response.data().tw)
            setGit(response.data().git)

        })
    })


    if(loading) return <Cload/>
    else return (
        <div>
            <Header/>
            <div className='editprofile'>
                <div className='profile'>
                    <div className='img'>
                        <img src='https://avatars3.githubusercontent.com/u/46472626?s=400&u=fbdf983ebbbed39b396e12718971d582c123d7f3&v=4' alt='profile image'/>
                    </div>
                    <div className='inputProf'>
                        <GitHubIcon className='inputIcn' />
                        <input type='text' placeholder='Your Name'/>
                    </div>
                </div>
                <div className='bio'></div>
            </div>
            <Footer/>
        </div>
    )
}

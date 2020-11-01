import React, {useState, useEffect} from 'react'
import './editpage.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import {db, storage} from '../../production/firebase'
import {auth} from '../../production/firebase'
import Cload from '../../reusable/loading/Load'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Spinner from '../../assets/spin2.svg'
import ProfileImg from '../../assets/profile_url.gif'

export default function Editpage({history}) {
    // const currUser = useContext(AuthContext);   
    const [image, setImage] = useState()
    const [imgload, setImgload] = useState(false)
    const [currUser, setCurrUser] = useState()
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
                setCurrUser(user)
            }else{
                history.push('/login')
            }
        })
    })


    useEffect(()=>{
        if(currUser) db.collection("author").doc(currUser.uid).get().then((response)=>{
            setUName(response.data().userName)
            setName(response.data().name)
            setUImage(response.data().img)
            setUBio(response.data().bio)
            setLinkdIN(response.data().bio)
            setTwit(response.data().tw)
            setGit(response.data().git)
    
        })
    },[currUser])
    const setprofiledata = () =>{
        if(currUser) db.collection('author').doc(currUser.uid).set({
            'name': `${name}`,
            'bio': `${uBio}`,
            'userName': `${uName}`,
            'img': `${uImage}`,
            'git': `${git}`,
            'ln': `${linkdIN}`,
            'tw': `${twit}`
        },{merge: true}).then(()=>{
            console.log(name, uBio, uName, uImage, git, linkdIN, twit)
            // alert('Your Profile data successfully updated')
        }).catch(err=>alert(err.message))
    }
    console.log(name, uBio, uName, uImage, git, linkdIN, twit)
    const uploadhandler =()=>{
        setImgload(true)
        if(currUser && image) storage.ref().child(`${currUser.uid}/profImg/${image.name}`).put(image).then(()=>{
            if(currUser && uImage)storage.refFromURL(uImage).delete().catch(err=>console.log(err.message));

            storage.ref(currUser.uid+'/profImg').child(image.name).getDownloadURL().then((url)=>{
                db.collection('author').doc(currUser.uid).set({
                    'img': `${url}`
                },{merge: true}).then(()=>setImgload(false)).catch(err=>alert(err.message))
                setUImage(url)
                setImgload(false)
            }).catch(err=>{
                alert(err.message)
                setImgload(false)
            })
        }).catch((err)=>{
            alert(err.message)
            setImgload(false)
        })
    }


    if(loading) return <Cload/>
    else return (
        <div>
            <Header/>
            <div className='editprofile'>
                <div className='profile'>
                    <div className='img' onClick={uploadhandler}>
                        <img src={uImage?imgload?Spinner:uImage:imgload?Spinner:ProfileImg} alt='profile image'/>
                    </div>
                    <div className='upload_img'>
                    <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
                    <button onClick={uploadhandler}>Upload</button>
                    </div>
                    
                    <div className='inputProf'>
                        <p>UserName</p>
                        <input disabled type='text' value={uName?uName:'Your Username'}/>
                        <p className='user_go'><a href="/boot">Edit</a></p>
                    </div>
                    <div className='inputProf'>
                        <p>Name</p>
                        <input type='text' onChange={n=>setName(n.target.value)}  placeholder={name?name:'Ex. John Doe'} />
                    </div>
                </div>
                <div className='bio'>
                    <div className='profile_tag'>
                        <p>Why you are wasting so much time here?</p>
                        <h2>Go and explore more... <br/> Serve something great to the internet that can help others.</h2>
                    </div>
                <div className='inputBio'>
                        <p>Bio</p>
                        <textarea maxLength='200' type='text' onChange={e=>setUBio(e.target.value)} placeholder={uBio?uBio:'Your Profile bio'} />
                    </div>
                    <div className='inputProf linkdin'>
                        <LinkedInIcon className='inputIcn' />
                        <input type='text' onChange={e=>setLinkdIN(e.target.value)}  placeholder={linkdIN?linkdIN:'Ex. https://www.linkedin.com/in/john/'} />
                    </div>
                    <div className='inputProf  twit'>
                        <TwitterIcon className='inputIcn' />
                        <input type='text' onChange={e=>setTwit(e.target.value)}  placeholder={twit?twit:'Ex. John56'} />
                    </div>
                    <div className='inputProf github'>
                        <GitHubIcon className='inputIcn' />
                        <input type='text' onChange={e=>setGit(e.target.value)}  placeholder={git?git:'Ex. John66'} />
                    </div>
                </div>
            </div>
            <div className='submit'>
                <p onClick={setprofiledata}>{'Next >>'}</p>
            </div>
            <Footer/>
        </div>
    )
}

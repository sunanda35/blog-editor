import React, {useState, useEffect} from 'react'
import './stat.css'
import {db, auth} from '../../production/firebase'
import Cload from '../../reusable/loading/Load'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Post from '../stats/posts/Post'

function Stat({history}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [currUser, setCurrUser] = useState()
    const [userName, setUserName] = useState()

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setCurrUser(user)
                db.collection('author').doc(user.uid).get().then((lload)=>{
                    setUserName(lload.data().userName)
                }).catch(err=>alert(err.message))
            }else{
                history.push('/login')
            }
        })
    })

    useEffect(()=>{
        userName && db.collection('posts').orderBy("views", "desc").where("userName", "==", userName).onSnapshot(snapshot => {
            try{
                setData(snapshot.docs.map(doc =>({
                    userid: doc.id,
                    ...doc.data()
                })))
            } catch(err){
                setLoading(false);
                alert(err.message)
            }
            setLoading(false)
        })
    },[data, userName])
    


    if(loading || !currUser) return <Cload/>
    else return (
        <div className='head'>
            <Header/>
            <div className='head_h'>
                <p>Your {data.length} sories found</p>
            </div>
            <div className='head_b'>
                {
                    data.map((post, index)=>{
                        return <Post key={index} title={post.title} description={post.description} time={post.time} views={post.views}/>
                    })
                }
            </div>
            <Footer/>
        </div>
    )
            
}

export default Stat

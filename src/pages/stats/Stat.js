import React, {useState, useEffect, useContext} from 'react'
import './stat.css'
import {db} from '../../production/firebase'
import Cload from '../../reusable/loading/Load'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Post from '../stats/posts/Post'
import {AuthContext} from '../../reusable/authentication/auth'
import { Redirect, withRouter } from 'react-router-dom'

function Stat() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const currUser = useContext(AuthContext);

    useEffect(()=>{
        currUser && db.collection('posts').orderBy("views", "desc").where("userID", "==", currUser.uid).onSnapshot(snapshot => {
            try{
                setData(snapshot.docs.map(doc =>({
                    userid: doc.id,
                    ...doc.data()
                })))
            } catch(err){
                setLoading(false);
            }
            setLoading(false)
        })
    })
    


    if(loading) return <Cload/>
    else if(loading && !currUser) return <Cload/>
    else if(!loading && !currUser) return <Redirect to='/login' />
    else return (
        <div className='head'>
            <Header/>
            <div className='head_h'>
                <p>Your {data.length} sories found</p>
            </div>
            <div className='head_b'>
                {
                    data.map((post, index)=>{
                        return <Post title={post.title} description={post.description} time={post.time} views={post.views}/>
                    })
                }
            </div>
            <Footer/>
        </div>
    )
            
}

export default Stat

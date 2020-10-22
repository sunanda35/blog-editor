import React, {useState, useEffect} from 'react'
import './stat.css'
import {db} from '../../production/firebase'
import Cload from '../../reusable/loading/Load'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Post from '../stats/posts/Post'

function Stat() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        db.collection('posts').orderBy("views", "desc").where("userName", "==", "@somu").onSnapshot(snapshot => {
            setData(snapshot.docs.map(doc =>({
                userid: doc.id,
                ...doc.data()
            })))
            setLoading(false)
        })
    })

    if(loading) return <Cload/>
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

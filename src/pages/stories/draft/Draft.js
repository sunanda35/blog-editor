import React, {useState, useEffect} from 'react'
import './draft.css'
import {db} from '../../../production/firebase'
import Post from '../../../reusable/posts/post'
import Cload from '../../../reusable/loading/Load'
import Npost from '../../../reusable/noPost/nopost'

function Draft({userID}) {
    const [story, setStory] = useState([])
    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState()
    useEffect(()=>{
        if(userID)db.collection('author').doc(userID).get().then(response=>{
            setUserName(response.data().userName)
        }).catch(err=>alert(err.message))
    })
    useEffect(()=>{
        if(userName)db.collection('draft').where("userName", "==", userName).onSnapshot(snapshot => {
            setStory(snapshot.docs.map(doc =>({
                userid: doc.id,
                ...doc.data()
            })))
            setLoading(false)
        })
    },[userName])
    if(loading) return <Cload/>
    else if(story.length<=0) return <Npost/>
    else return (
        <div className='posts'>
            <div>
            {
                story.map((post, index)=>{
                    return (<Post key={index} title={post.title} description={post.description} userid={post.userid} time={post.time} draft={true} subfor={post.subfor}/>)
                })
            }
            </div>
        </div>
    )
}

export default Draft

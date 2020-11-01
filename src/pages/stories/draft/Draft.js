import React, {useState, useEffect} from 'react'
import './draft.css'
import {db} from '../../../production/firebase'
import Post from '../../../reusable/posts/post'
import Cload from '../../../reusable/loading/Load'
import Npost from '../../../reusable/noPost/nopost'

function Draft({userID}) {
    const [story, setStory] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        db.collection('posts').orderBy("views", "desc").where("userID", "==", userID).onSnapshot(snapshot => {
            setStory(snapshot.docs.map(doc =>({
                userid: doc.id,
                ...doc.data()
            })))
            setLoading(false)
        })
    },[userID])
    if(loading) return <Cload/>
    else if(story.length<=0) return <Npost/>
    else return (
        <div className='posts'>
            <div>
            {
                story.map((post, index)=>{
                    return (<Post key={index} title={post.title} description={post.description} imgUrl={post.imgUrl} draft={true}/>)
                })
            }
            </div>
        </div>
    )
}

export default Draft

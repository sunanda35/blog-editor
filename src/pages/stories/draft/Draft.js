import React, {useState, useEffect} from 'react'
import './draft.css'
import {db} from '../../../production/firebase'
import Post from '../../../reusable/posts/post'
import Cload from '../../../reusable/loading/Load'

function Draft() {
    const [story, setStory] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        db.collection('posts').orderBy("views", "desc").where("userName", "==", "@somu").onSnapshot(snapshot => {
            setStory(snapshot.docs.map(doc =>({
                userid: doc.id,
                ...doc.data()
            })))
            setLoading(false)
        })
    })
    return (
        <div className='posts'>
            <div>
            {
                !loading? story.map((post, index)=>{
                    return (<Post key={index} title={post.title} description={post.description} imgUrl={post.imgUrl} draft={true}/>)
                }):<Cload/>
            }
            </div>
        </div>
    )
}

export default Draft

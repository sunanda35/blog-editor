import React, {useState, useEffect} from 'react'
import './publish.css'
import {db} from '../../../production/firebase'
import Post from '../../../reusable/posts/post'
import Cload from '../../../reusable/loading/Load'

export default function Publish() {
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
        <div>
            <div className='publish'>
            {
                !loading? story.map((post, index)=>{
                    return (<Post key={index} title={post.title} description={post.description} imgUrl={post.imgUrl} draft={false} />)
                }):<Cload/>
            }
            </div>
        </div>
    )
        }

import React, {useState, useEffect} from 'react'
import './publish.css'
import {db} from '../../../production/firebase'
import Post from '../../../reusable/posts/post'
import Cload from '../../../reusable/loading/Load'
import Npost from '../../../reusable/noPost/nopost'

export default function Publish({userID}) {
    const [story, setStory] = useState([])
    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState()
    useEffect(()=>{
       if(userID) db.collection('author').doc(userID).get().then(response=>{
            setUserName(response.data().userName)
        }).catch(err=>alert(err.message))
    },[userID])

    useEffect(()=>{
        if(userName)db.collection('posts').where("userName", "==", userName).onSnapshot(snapshot => {
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
        <div>
            <div className='publish'>
            {
                story.map((post, index)=>{
                    return (<Post key={index} title={post.title} description={post.description} time={post.time} draft={false} />)
                })
            }
            </div>
        </div>
    )
        }

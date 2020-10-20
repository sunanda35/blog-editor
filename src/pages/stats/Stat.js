import React, {useState, useEffect} from 'react'
import './stat.css'
import {db} from '../../production/firebase'
import Cload from '../../reusable/loading/Load'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

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
        <div>
            <Header/>
            <h1>Here i have to write the statistics of this website</h1>
            <Footer/>
        </div>
    )
            
}

export default Stat

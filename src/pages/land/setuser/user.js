import React, {useState, useEffect} from 'react'
import './user.css'
import {title} from '../../../production/Strings'
import {db} from '../../../production/firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorIcon from '@material-ui/icons/Error';
import { Link } from 'react-router-dom';

export default function User() {
    const [username, setUsername] = useState()
    const [progress, setProgress] = useState(false)
    const [success, setSuccess] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [error, setError] = useState('fuck off buddy')

    const firestoreAutoId = ()=> {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      
        let autoId = ''
      
        for (let i = 0; i < 20; i++) {
          autoId += CHARS.charAt(
            Math.floor(Math.random() * CHARS.length)
          )
        }
        return autoId
      }

    useEffect(()=>{
        setProgress(true)
        db.collection('author').where("userName", "not-in", "@somu").doc("sunanda").set({
            'authId': 'slkdfkldhfljsdhfjhsd',
            'userName': `${username}`
        }).then(()=>{
            setProgress(false)
            setSuccess(true)
        }).catch(err=>{
            setProgress(false)
            setWrong(true)
            setError(err.messege)
        })
    },[username])
    

    return (
        <div className='setuser'>
            <h1>Welcome to {title}, Internet's free and open platform where readers find dynamic thinking, and where anyone can share their writing on any topic to the web and get rewarded.</h1>
            <p>"Live life as though nobody is watching, and express yourself as though everyone is listening."</p>
            <h6>--Nelson Mandela</h6>
    <h2>As a {title} signed user, you will be able to -</h2>
        <ul>
            <li>Read everything in free of cost</li>
            <li>Can contribute any article on any topic and get rewarded</li>
            <li>You can Bookmark your article to get found early</li>
            <li>You can give your unbiased reaction on any article</li>
        </ul>
        <div className='username'>
        <p>Choose Your Username:</p>
            <div className='user_input'>
                <p>@</p>
                <input type='text' placeholder='username' onChange={e=>setUsername(e.target.value)}></input>
                </div>
                <div className='icn'>
                    {
                        progress && <CircularProgress size='20px' className='progress'/>
                    }
                    {
                        success && <Tooltip title='This Username is available' ><CheckCircleIcon className='success_icn'/></Tooltip>
                    }
                    {
                        wrong && <Tooltip title='This user name is not available'><CancelIcon className='wrong_icn'/></Tooltip>
                    }

                
                
                
                </div>
              </div>
              {
                  wrong && <div className='error' >
                  <ErrorIcon className='err_icn' />
                  <p>{error}</p>
              </div>
              }
              {
                  success && <button disabled={success} className='nextbtn'><Link className='li' to={success && '/editurprofile'}>Next >></Link></button>
              }

        </div>
    )
}

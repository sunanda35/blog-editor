import React, {useState, useEffect, useContext} from 'react'
import './user.css'
import {title} from '../../../production/Strings'
import {db} from '../../../production/firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorIcon from '@material-ui/icons/Error';
import {AuthContext} from '../../../reusable/authentication/auth'
import Cload from '../../../reusable/loading/Load';

export default function User({history}) {
    const [username, setUsername] = useState()
    const [progress, setProgress] = useState(false)
    const [success, setSuccess] = useState(false)
    const [wrong, setWrong] = useState(false)
    const currUser = useContext(AuthContext);

    const [state, setState] = useState(false)



    useEffect(()=>{
        setWrong(false)
        setSuccess(false)
        setProgress(true)
        db.collection("author").where("userName", "==", `@${username}`).get().then((response)=>{
                response.docs.map(docc=>{
                    setProgress(false)
                    if(docc.data().userName===`@${username}`){
                        setProgress(false)
                        setSuccess(false)
                        setWrong(true)
                        setState(false);
                    }
                })
        }).catch((err)=>{
            setWrong(false)
            setProgress(false)
            setSuccess(false)
            alert(err.message)
        })
        if(username){
            setWrong(false)
            setProgress(false)
            setSuccess(true)
            setState(true)
        }
        currUser && console.log(currUser.uid)
    },[username])
    
    const setusername = () =>{
        currUser && db.collection("author").doc(currUser.uid).set({
            'userName': `@${username}`
        },{merge: true}).then(()=>{
            alert('gotit')
            history.push('/stories')
        }).catch(err=>alert(err.message))
    }


    if(!currUser) return <Cload/>
    else return (
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
                  <p>This username is already taken</p>
              </div>
              }
              {
                  success && <button onClick={setusername} className='nextbtn'>sdfsdf</button>
              }

        </div>
    )
}

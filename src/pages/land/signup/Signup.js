import React,{useState} from 'react'
import './signup.css'
import Footer from '../../../components/footer/Footer'
import Header from '../../../components/header/Header'
import Google from '../../../assets/brand/google.svg'
import Facebook from '../../../assets/brand/facebook.svg'
import Twitter from '../../../assets/brand/twitter.svg'
import Linkdin from '../../../assets/brand/linkedin.svg'
import {auth} from '../../../production/firebase'
import {withRouter} from 'react-router-dom'
import {db} from '../../../production/firebase'

function Land({history}) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
    const signuphappen = () =>{
        auth.createUserWithEmailAndPassword(email, password).then((user)=>{
            db.collection('author').doc(user.user.uid).set({
                'userID': `${user.user.uid}`,
                'email':`${user.user.email}`
            }).then(()=>{
                alert('Successfully New account created')
                history.push('/boot')
            }).catch(err=>{
                alert('pass: '+err.message)
            })
            history.push('/boot')
        }).catch(err=>alert(err.message))

    }

    // const currUser = useContext(AuthContext);
    // if(currUser){
    //     db.collection('author').doc().set({
    //         'userID': currUser.uid
    //     }).then(()=>{
    //         alert
    //     }).catch(err=>{
    //     })
    //     // return <Redirect to='/stories' />
    // }


    return (
        <div>
            <Header/>
            <div className='signin'>
            <p>Create Account</p>
                <div className='brands'>
                    <div className='brandin'>
                    <img src={Google} alt='google'/>
                    </div>
                    <div className='brandin'>
                    <img src={Facebook} alt='facebook'/>
                    </div>
                    <div className='brandin'>
                    <img src={Twitter} alt='twitter'/>
                    </div>
                    <div className='brandin'>
                    <img src={Linkdin} alt='linkdin'/>
                    </div>
                </div>
                <h4>OR</h4>
                <div>
                    <div className='input'>
                    <input className='comp' type='email' onChange={e=>setEmail(e.target.value)} placeholder='Email' />
                    </div>
                    <div className='input'>
                    <input className='comp' type='password' onChange={e=>setPassword(e.target.value)} placeholder='Password' />
                    </div>
                </div>
                <div>
                <p className='btn' onClick={signuphappen}>Submit</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default withRouter(Land)
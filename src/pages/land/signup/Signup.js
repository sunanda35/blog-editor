import React,{useState} from 'react'
import './signup.css'
import Footer from '../../../components/footer/Footer'
import Header from '../../../components/header/Header'
import Google from '../../../assets/brand/google.svg'
import Facebook from '../../../assets/brand/facebook.svg'
import Twitter from '../../../assets/brand/twitter.svg'
import Linkdin from '../../../assets/brand/linkedin.svg'

export default function Land() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const alertt = ()=>{
        alert(email +'and' + password);
    }

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
                <p className='btn' onClick={alertt}>Submit</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

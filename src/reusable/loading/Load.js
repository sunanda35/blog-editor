import React from 'react'
import './load.css'
import spinner from '../../assets/spin2.svg'

function Cload() {
    return (
        <div className='spinner'>
            <img src={spinner} alt='spinner'/>
        </div>
    )
}

export default Cload

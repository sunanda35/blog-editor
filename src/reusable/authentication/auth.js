import React, {useState, useEffect} from 'react'
import {auth} from '../../production/firebase'

export const AuthContext = React.createContext();

export function Auth({children}) {
    const [currUser, setCurrUser] = useState(null)

    useEffect(()=>{
        auth.onAuthStateChanged(setCurrUser);
    },[])

    return (
        <AuthContext.Provider value={currUser} >
            {children}
        </AuthContext.Provider>
    )
}

import React from 'react'
import './post.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import {db} from '../../production/firebase'

export default function post({title, description, userid, time, draft, subfor}) {
    const timecalc = (time)=>{
        if(time){
            var today = new Date()
            var date = time.toDate().getDate();
            var hours = time.toDate().getHours();
            var minutes = time.toDate().getMinutes();
            var seconds = time.toDate().getSeconds();
            let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
            if(today.getFullYear()===time.toDate().getFullYear()){
                if((today).getMonth()===time.toDate().getMonth()){
                    if(today.getDate()===date){
                        if(today.getHours()===hours){
                            if(today.getMinutes()===minutes){
                                return today.getSeconds()-seconds+' seconds ago';
                            }else{
                                return today.getMinutes()-minutes+' minutes ago'
                            }
                        }else{
                            return today.getHours()-hours+' hours ago'
                        }
                    }else{
                        return time.toDate().getDate()+'th '+ monthNames[time.toDate().getMonth()];
                    }
                }else{
                    return time.toDate().getDate()+'th '+monthNames[time.toDate().getMonth()];
                }
            }else{
                return time.toDate().getDate()+'th '+monthNames[time.toDate().getMonth()]+', '+time.toDate().getFullYear();
            }
        }else{
            return 'undefined'
        }
        
    }

    return (
        <div className='post' >
            
            <h3>{title}</h3>
                <p>{description}</p>
                <div className='auth'>
                    {
                        subfor?<p style={{
                            fontWeight:'bold',
                            color: 'greenyellow'
                        }}>{'Submitted'}</p>:null
                    }
                    {
                        draft?<p>{'Last edited on ' + timecalc(time)}</p>:<p>{'Published on ' + timecalc(time)}</p>
                    }
                    {
                        draft?<Link className='li' to={'/draft/'+userid} ><EditIcon className='a_icn_w'  fontSize='small' /></Link>:null
                    }
                    {
                        draft?<DeleteForeverIcon className='a_icn_d' fontSize='small' onClick={()=>{
                            db.collection('draft').doc(userid).delete().then(()=>{
                                alert('Your data has been parmanently deleted, you can never get it back')
                            }).catch(err=>alert(err.message))
                        }} />:null
                    }
                </div>
        </div>
    )
}

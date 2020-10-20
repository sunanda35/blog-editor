import React from 'react'
import './post.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function post({title, description, draft}) {
    return (
        <div className='post'>
            <h3>{title}</h3>
                <p>{description}</p>
                <div className='auth'>
                    {
                        draft?<p>Last edited on 8th oct</p>:<p>Published on 8th oct</p>
                    }
                    {
                        draft?<EditIcon className='a_icn_w' fontSize='small' />:null
                    }
                    <DeleteForeverIcon className='a_icn_d' fontSize='small' />
                </div>
        </div>
    )
}

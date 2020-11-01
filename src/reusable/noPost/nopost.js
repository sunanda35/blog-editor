import React from 'react'
import './nopost.css'
import DraftsIcon from '@material-ui/icons/Drafts';

export default function Npost() {
    return (
        <div className='nopost'>
            <h1><DraftsIcon className='nopost_icn' fontSize='medium'/>Try a new Draft</h1>
            <p>Get Publishing Guide....</p>
            <div className='post_help'>
                <p>Publishing help will be there</p>
            </div>
        </div>
    )
}

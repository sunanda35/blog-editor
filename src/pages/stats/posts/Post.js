import React from 'react'
import './post.css'

export default function post({title, time, views, love, dlike, readTime}) {
    return (
        <div className='post'>
            <div className='p_title'>
            <h3>{title}</h3>
            <div className='p_title_b'>
            <p>10th Oct, 20</p>
            <p>See Stories</p>
            <p>Detail Status</p>
            </div>
            </div>
            <div className='p_detail'>
                {
                    views?<div className='p_des'>
                    <h4>{views}</h4>
                    <p>views</p>
                </div>:<div className='p_des'>
                    <p>Unknown</p>
                </div>
                }
                {
                    readTime?<div className='p_des'>
                    <h4>10</h4>
                    <p>reads</p>
                </div>:<div className='p_des'>
                    <h4>0</h4>
                    <p>reads</p>
                </div>
                }
                {
                    love?<div className='p_des'>
                    <h4>10</h4>
                    <p>love</p>
                </div>:<div className='p_des'>
                    <h4>0</h4>
                    <p>love</p>
                </div>
                }
                {
                    dlike?<div className='p_des'>
                    <h4>10</h4>
                    <p>hate</p>
                </div>:<div className='p_des'>
                    <h4>0</h4>
                    <p>hate</p>
                </div>
                }
            </div>
            
        </div>
    )
}

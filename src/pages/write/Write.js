import React from 'react'
import './write.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { Editor, EditorState} from 'draft-js'


export default class Draft extends React.Component{
    state = {
        editorstate : EditorState.createEmpty()
    }
    onChange = (editorstate) => this.setState({editorstate});

    render(){
        return (
            <div>
                <Header/>
                <div className='draft_h'>
                    <div className='draft_h_t'>
                        <div className='d_h_t_t'>
                        <p>Save</p>
                        <SaveOutlinedIcon className='icn' />
                        </div>
                        <div className='d_h_t_t'>
                        <p>Submit</p>
                        <PublishOutlinedIcon className='icn' />
                        </div>
                    </div>
                </div>
                <div className='draft'>
                    <input className='d_title' type='text' placeholder='Title' rows='2' maxLength='100'  />

                    <Editor editorState={this.state.editorstate} onChange={this.onChange} />
                    
                    {/* <div contentEditable maxLength='10' onChange={e=>setWrite(e.target.value)}></div> */}
                </div>
                <Footer/>
            </div>
        )
    }
}







// export default function Draft() {
//     const [write, setWrite] = useState()
//     useEffect(()=>{
//         console.log(write)
//     },[write])

    
// }

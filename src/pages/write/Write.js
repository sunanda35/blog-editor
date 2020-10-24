import React from 'react'
import './write.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { Editor, EditorState} from 'draft-js'



export default class Draft extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            editorstate : EditorState.createEmpty()
        }
      }



    updateState(editorstate){
        this.setState({editorstate});
    }


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
                    <button>bold</button>
                    {/* <input className='d_title' type='text' placeholder='Title' rows='2' maxLength='100'  /> */}

                    <Editor editorState={this.state.editorstate} placeholder='Tell your story...' handleKeyCommand={this.handleKeyCommand} onChange={this.updateState.bind(this)} />
                    
                    {/* <div contentEditable maxLength='10' onChange={e=>setWrite(e.target.value)}></div> */}
                </div>
                <Footer/>
            </div>
        )
    }
}






// export default function Write() {
//     const [editorstate, setEditorstate] = useState(()=>EditorState.createEmpty())
//     useEffect(()=>console.log(editorstate))

//     return (
//         <div>
//             <Header/>
//             <div className='draft_h'>
//                 <div className='draft_h_t'>
//                     <div className='d_h_t_t'>
//                     <p>Save</p>
//                     <SaveOutlinedIcon className='icn' />
//                     </div>z
//                     <div className='d_h_t_t'>
//                     <p>Submit</p>
//                     <PublishOutlinedIcon className='icn' />
//                     </div>
//                 </div>
//             </div>
//             <div className='draft'>
//                 <input className='d_title' type='text' placeholder='Title' rows='2' maxLength='100'  />

//                 <Editor editorState={editorstate} onChange={setEditorstate} />
                
//                 {/* <div contentEditable maxLength='10' onChange={e=>setWrite(e.target.value)}></div> */}
//             </div>
//             <Footer/>
//         </div>
//     )
// }




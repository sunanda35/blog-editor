import React from 'react'
import './write.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { Editor } from '@tinymce/tinymce-react';
import { auth, db, storage } from '../../production/firebase'
import Modal from 'react-modal';
import {title} from '../../production/Strings'
import LoadingPic from '../../assets/spin2.svg'
import Imgnot from '../../assets/imgnotavailable.png'
import { firestore } from 'firebase';
import { Redirect } from 'react-router-dom';
import Cload from '../../reusable/loading/Load';

Modal.setAppElement('#root')

export default class Draft extends React.Component{

    constructor(props){
        super(props);
        this.state={
            title: '',
            story: '',
            seoTitle: '',
            description: '',
            image: '',
            tags: [],
            canonical: '',
            img: '',
            currUser: '',
            submit: false,
            saving: false,
            err: '',
            load: false,
            pageLoad: false,
            slugUrl: '',
            urlID: this.props.match.params.slug
        };

        if(!this.props.match.params.slug){
            const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

            let autoId = ''
          
            for (let i = 0; i < 20; i++) {
              autoId += CHARS.charAt(
                Math.floor(Math.random() * CHARS.length)
              )
            }
            this.props.history.push('/draft/'+autoId)
          }


        this.uploadhandler=this.uploadhandler.bind(this);
        this.updatehandler = this.updatehandler.bind(this);
        this.dataupdate = this.dataupdate.bind(this)

        auth.onAuthStateChanged(user=>{
            if(user) {
                this.setState({ pageLoad: true})
                this.setState({currUser: user})
                this.dataupdate()
            }
            else window.open('/login')
        })
    }


    prevdataset(){
        if(this.state.currUser && this.state.urlID){
            this.setState({saving: true})
            this.setState({
                seoTitle: this.state.title,
                slugUrl: this.state.title.replace(/\s+/g, '-')+'-'+this.state.urlID.substring(0,5),
                description: this.state.story.replace( /(<([^>]+)>)/ig, '').substring(0,150)
            })
        db.collection('draft').doc(this.state.urlID).set({
            'title': `${this.state.title}`,
            'seoTitle': `${this.state.seoTitle}`,
            'description': `${this.state.description}`,
            'blog': `${this.state.story}`,
            'slugUrl': `${this.state.slugUrl}`,
            'time': `${firestore.Timestamp.now()}`
        },{merge: true}).then(()=> this.setState({saving: false})).catch(err=>{
            this.setState({err: err.message})
            alert(err.message)
        })
        }
    }
    dataupdate(){
        if(this.state.urlID && this.state.currUser) db.collection("draft").doc(this.state.urlID).get().then((response)=>{
            if(response.data()){
                this.setState({
                    title: response.data().title,
                    seoTitle: response.data().seoTitle,
                    img: response.data().img,
                    description: response.data().description,
                    tags: response.data().tags,
                    story: response.data().blog,
                    canonical: response.data().canonical,
                })
            }
    
        })
    }

    uploadhandler(){
        this.setState({load: true})
        if(this.state.currUser && this.state.image) storage.ref().child(`${this.state.currUser.uid}/blog/${this.state.image.name}`).put(this.state.image).then(()=>{
            if(this.state.currUser && this.state.img)storage.refFromURL(this.state.img).delete().catch(err=>console.log(err.message));
            storage.ref(this.state.currUser.uid+'/blog').child(this.state.image.name).getDownloadURL().then((url)=>{
                this.setState({img:url})
                this.setState({load: false})
            }).catch(err=>{
                this.setState({load: false})
                alert(err.message)
            })
        }).catch((err)=>{
            this.setState({load: false})
            alert(err.message)
        })
    }


    updatehandler(){
            if(this.state.currUser && this.state.urlID){
            db.collection('draft').doc(this.state.urlID).set({
                'seoTitle': `${this.state.seoTitle}`,
                'description': `${this.state.description}`,
                'img': `${this.state.img}`,
                'tags': `${this.state.tags}`,
                'canonical': `${this.state.canonical}`
            },{merge: true}).then(()=>console.log('updated') ).catch(err=>alert(err.message))
            }
    
    }
    componentDidUpdate(prevProps, prevState){
            if(prevState.title!==this.state.title){
                this.setState({
                    seoTitle: this.state.title,
                    slugUrl: this.state.title.replace(/\s+/g, '-')+'-'+this.state.urlID.substring(0,5),
                    description: this.state.story.replace( /(<([^>]+)>)/ig, '').substring(0,150)
                })
                console.log('doing good buddy')
            }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.story !==this.state.story || prevState.title !==this.state.title){
        setTimeout(() => {
            
                if(this.state.currUser && this.state.urlID){
                    this.setState({saving: true})
                    this.setState({
                        seoTitle: this.state.title,
                        slugUrl: this.state.title.replace(/\s+/g, '-')+'-'+this.state.urlID.substring(0,5),
                        description: this.state.story.replace( /(<([^>]+)>)/ig, '').substring(0,150)
                    })
                db.collection('draft').doc(this.state.urlID).set({
                    'title': `${this.state.title}`,
                    'seoTitle': `${this.state.seoTitle}`,
                    'description': `${this.state.description}`,
                    'blog': `${this.state.story}`,
                    'slugUrl': `${this.state.slugUrl}`,
                    'time': `${firestore.Timestamp.now()}`
                },{merge: true}).then(()=> this.setState({saving: false})).catch(err=>{
                    this.setState({err: err.message})
                    alert(err.message)
                })
                }
                
        }, 1000);
    }
    }

    handleEditorChange = (content, editor) => {
        this.setState({story: content})
      }



    render(){
        if(!this.state.pageLoad) return <Cload/>
        else return (
            <div>
                <Header/>
                <div className='draft_h'>
                    <div className='draft_h_t'>
                    {
                            this.state.saving?<p style={{color: "yellow"}} >Saving..</p>:this.state.err?<p style={{color: "rgb(255, 166, 0)", fontWeight: "bolder"}} >UnSaved: {this.state.err}</p>:<p style={{color:"yellow"}} >Saved</p>
                        }
                        
                        <div className='d_h_t_t'>
                        <p onClick={()=>this.setState({submit: true})} >Submit</p>
                        <PublishOutlinedIcon className='icn' />
                        </div>
                    </div>
                </div>
                <div className='draft'>
                    <textarea className='d_title' maxLength='100' value={this.state.title?this.state.title:null} onChange={e=>this.setState({title: e.target.value})}></textarea>
                {
                    window.innerWidth>700?<Editor
                    apiKey="5h0owzmjio0t7clg6ux9vb8u3hvf1yyrsdixmprkzq2km53h"
                    initialValue="<p>Brief your story here...</p>"
                    value={this.state.story?this.state.story:null}
                    init={{
                       height: 800,
                       menubar: false,
                       branding:false,
                       plugins: [
                        'autolink',
                        'codesample',
                        'link',
                        'lists',
                        'powerpaste',
                        'table',
                        'image',
                        'quickbars',
                        'codesample',
                        'embeded',
                        'help'
                      ],
                      toolbar: false,
                      quickbars_insert_toolbar: 'quicktable image media codesample',
                      quickbars_selection_toolbar: 'bold italic underline | formatselect | blockquote quicklink',
                      contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
                      powerpaste_word_import: 'clean',
                      powerpaste_html_import: 'clean',
                     }}
                     onEditorChange={this.handleEditorChange}
                   />:<Editor
                   apiKey="5h0owzmjio0t7clg6ux9vb8u3hvf1yyrsdixmprkzq2km53h"
                   tinymceScriptSrc='/path/to/tinymce.min.js'
                   initialValue="<p>Brief your story here...</p>"
                   value={this.state.story}
                   init={{
                     height: 500,
                     menubar: false,
                     branding: false,
                     plugins: [
                       'advlist autolink lists link image charmap print preview anchor',
                       'searchreplace visualblocks code fullscreen',
                       'insertdatetime media table paste code help wordcount'
                     ],
                     toolbar:
                       'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                   }}
                   onEditorChange={this.handleEditorChange}
                 />
                }
                </div>
                <Modal isOpen={this.state.submit} style={{
                    overlay:{
                        backgroundColor: 'rgba(91, 86, 86, 0.47)'
                    },
                    content:{
                        width: '60%',
                        margin: 'auto'
                    }
                }}>
                    <div style={{
                        width:'100%', 
                        backgroundColor: 'white'}}>
                            <p onClick={()=>this.setState({submit: false})} style={{
                                padding:'5px',
                                width: '100px',
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                border: '1px solid grey',
                                marginLeft: 'auto',
                                marginBottom: '30px',
                                borderRadius: '5px',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }} >close</p>
                        <div style={{
                            width: '90%',
                            margin: 'auto'}} >
                            <div style={{
                                width: '16rem',
                                height: '9rem',
                                overflow: 'hidden',
                                margin: 'auto',
                                border: '.5px solid grey'}}>
                                <img style={{
                                    width: '100%',
                                    objectFit: 'contain'}} src={this.state.load?LoadingPic:this.state.img===''?Imgnot:this.state.img} alt={this.state.title?this.state.title:'Blog main image'} />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                marginTop: '10px'}}>
                                    <input type="file" accept="image/*" onChange={e=>this.setState({image:e.target.files[0]})} />
                                    <button onClick={this.uploadhandler} >Image Upload</button>
                            </div>

                        <div style={{
                            marginTop:'40px',
                            marginBottom: '40px'
                            }}>
                        <h3 style={{
                            marginBottom:'5px'
                            }}>Tags:</h3>
                        <p style={{
                            marginBottom:'5px'
                            }} >This tags will help readers to get personalize recomendation of stories and it helps a lot to know search engine.</p>
                            <div style={{
                            width: '100%',
                            height: '45px', 
                            borderRadius:'5px', 
                            backgroundColor: '#c9c9c9',
                            overflow:'hidden'}} >
                                <input style={{
                                    width: '100%', 
                                    height: '100%', 
                                    border: 'none', 
                                    backgroundColor: 'transparent'}} type='text' placeholder={this.state.tags} />
                            </div>
                        </div>
                        
                        <div>
                        <h3 style={{marginBottom:'5px'}}>SEO Title:</h3>
                        <p style={{marginBottom:'5px'}} >This Title will use in place of your Title on search engine results pages like Google, Bing. SEO title over 70 character will be very bad. Good title will be in 50-60 character</p>
                        <p style={{marginBottom:'5px', fontWeight: 'bold'}} >Title Preview({this.state.seoTitle.replace(/ /g, "").length}): {this.state.seoTitle} | {title} </p>

                            <div style={{
                            width: '100%',
                            height: '45px', 
                            borderRadius:'5px', 
                            backgroundColor: '#c9c9c9',
                            overflow:'hidden'}} >
                                <input style={{
                                    width: '100%', 
                                    height: '100%', 
                                    border: 'none', 
                                    backgroundColor: 'transparent'}} type='text' maxLength='100' onChange={e=>{
                                        this.prevdataset(); 
                                        this.setState({seoTitle: e.target.value})
                                    }} value={this.state.seoTitle?this.state.seoTitle:null} placeholder='Your story SEO title ..' />
                            </div>
                            <p style={{marginBottom:'5px', fontWeight: 'bold'}} >Story Url: {this.state.slugUrl} </p>
                        </div>
                        <div style={{marginTop:'40px'}}>
                        <h3 style={{marginBottom:'5px'}}>SEO Description:</h3>
                        <p style={{marginBottom:'5px'}} >This Description will use in place of your Subtitle on search engine results pages like Google, Bing. Quality Description utilize keywards and summarize the story, Between 130-170 character will good.</p>
                        <p style={{marginBottom:'5px', fontWeight: 'bold'}} >Description Preview({this.state.description.replace(/ /g, "").length}): {this.state.description}</p>

                            <div style={{
                            width: '100%',
                            height: '55px', 
                            borderRadius:'5px', 
                            backgroundColor: '#c9c9c9',
                            overflow:'hidden'
                            }} >
                                <textarea style={{
                                    width: '100%', 
                                    height: '100%', 
                                    border: 'none', 
                                    letterSpacing: 'normal',
                                    wordSpacing: 'normal',
                                    backgroundColor: 'transparent'
                                    }} type='text' maxLength='180' onChange={e=>this.setState({description: e.target.value})}  value={this.state.description?this.state.description:null} placeholder='Your story SEO Description/subtitle ..' ></textarea>
                            </div>
                        </div>
                        <div style={{marginTop:"20px"}}>
                        <h3 style={{marginBottom:'5px'}}>Canonical:</h3>
                        <p style={{marginBottom:'5px'}} >When articles are published on more than one website, search engines use canonical links to determine and prioritize the ultimate source of content. If this content published on any website, please give link below..</p>

                            <div style={{
                            width: '100%',
                            height: '45px', 
                            borderRadius:'5px', 
                            backgroundColor: '#c9c9c9',
                            overflow:'hidden'}} >
                                <input style={{
                                    width: '100%', 
                                    height: '100%', 
                                    border: 'none', 
                                    backgroundColor: 'transparent'}} type='text' maxLength='100' onChange={e=>this.setState({canonical: e.target.value})} value={this.state.canonical?this.state.canonical:null} placeholder='Canonical url here ...' />
                            </div>
                        </div>
                        </div>
                        <p onClick={()=>{
                            this.updatehandler()
                            this.setState({submit: false})
                        }} style={{
                            padding:'10px', 
                            width:'300px', 
                            margin:'auto', 
                            marginTop:'20px', 
                            backgroundColor: 'teal', 
                            borderRadius: '5px', 
                            textAlign: 'center', 
                            cursor: 'pointer'}}>Submit for review</p>
                    </div>
                </Modal>
                <Footer/>
            </div>
        )
    }
}





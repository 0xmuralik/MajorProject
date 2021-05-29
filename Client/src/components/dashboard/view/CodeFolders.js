import React, { Component } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import * as FcIcons from 'react-icons/fc';
import * as MdIcons from 'react-icons/md';
import CreateFolder from './CreateFolder';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class CodeFolders extends Component {

    constructor(props) {
        super(props);
        // this.state={folderStructure:this.props.folderStructure,
        //             breadCrumbList: [{title:'Research',show:true}],
        //             displayFolderCreationForm: false
        // }
        this.handlecallback=this.handlecallback.bind(this);
        this.state={currentFolderID: this.props.parentFolderID
        ,currentFolder: [],
        subFolders:[],
        doRender:false,
        displayFolderCreationForm:false,
        breadCrumbList: ['']
    }
    }
    componentDidMount() {
        this.setState({doRender:false});
        axios.get('http://localhost:5000/folders/'+this.state.currentFolderID)
    .then((response)=>{
        this.setState({currentFolder: response.data},()=>{
            this.setState({breadCrumbList:[this.state.currentFolder]})
        });
        (this.state.currentFolder.subfolders).map((subfolderID)=>{
            axios.get('http://localhost:5000/folders/'+subfolderID)
            .then((resp)=>{
                this.setState({subFolders:[...this.state.subFolders,resp.data]});
            })
        })
        this.setState({doRender: true});
    })
    .catch((error)=>{
        console.log(error);
    })
    
    }
    static getDerivedStateFromProps(props, state) {
        
      }

    clickFolderHandler=(folder)=>{
        console.log("hello onclick", folder)

        this.state.currentFolderID = folder._id;
        this.state.currentFolder=folder;
        const index=(this.state.breadCrumbList).indexOf(this.state.currentFolder);
        if(index==-1){
            this.setState({breadCrumbList:[...this.state.breadCrumbList,folder]});
        }
        else{
            this.setState({breadCrumbList:(this.state.breadCrumbList).slice(0,index+1)});
        }
        console.log(index,'index')
        this.state.subFolders=[];
        (this.state.currentFolder.subfolders).map(async(subfolderID)=>{
            this.setState({doRender:false})
            await axios.get('http://localhost:5000/folders/'+subfolderID)
            .then((resp)=>{
                
                this.setState({subFolders:[...this.state.subFolders,resp.data]},()=>{
                    this.setState({doRender:true});
                })
            })
        })
        

    };
    createFolderHandler=()=>{
        console.log("HELLo")
        console.log(this.state.currentFolderID)
        this.setState({displayFolderCreationForm:!this.state.displayFolderCreationForm});
    };
    handlecallback=(toDoAfterFolderCreation)=>{
        this.setState({displayFolderCreationForm:toDoAfterFolderCreation.displayFolderCreationForm,
            currentFolder:toDoAfterFolderCreation.currentFolder,
            subFolders:[...this.state.subFolders,toDoAfterFolderCreation.newFolder]
        })
        console.log(this.state.currentFolder);
    }
    render() {
        return (
            this.state.doRender?
            <>
            <div style={{padding: '30px 0px 30px 20px', background:'#aeb9f7'}}>
                <h3>{this.state.currentFolder.name}</h3>
            </div>
            <div style={{padding: '30px 0px 30px 20px', background:'#d8dbf0'}}>
                <Breadcrumb>
                    {(this.state.breadCrumbList).map((folder,index)=>(
                        <Breadcrumb.Item onClick={this.clickFolderHandler.bind(this, folder)} active={((this.state.breadCrumbList).length-1===index)}>{folder.name}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                <div style={{padding: '30px 0px 00px 20px', background:'#d8dbf0'}}>
                    <p>
                        {this.state.currentFolder.description}
                    </p>
                </div >
                <div style={{padding: '30px 0px 30px 20px', background:'#d8dbf0'}}>
                        <ul>
                            <li><Link onClick={this.createFolderHandler}><span style={{fontSize:'40px'}}><MdIcons.MdCreateNewFolder /></span></Link></li>
                                {this.state.displayFolderCreationForm?<CreateFolder parentcallback={this.handlecallback} parentID={this.state.currentFolderID}/>:''}
                            <hr/>
                            {this.state.subFolders.map((folder)=>(
                                <>
                                <li><FcIcons.FcFolder /><Link onClick={this.clickFolderHandler.bind(this, folder)}><span>{folder.name}</span></Link></li>
                                <hr/>
                                </>
                            ))}
                        </ul>
                </div>
            </div>
            </>:''
        )
    }
}

export default CodeFolders

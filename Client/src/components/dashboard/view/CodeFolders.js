import React, { Component } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import * as FcIcons from 'react-icons/fc';
import * as MdIcons from 'react-icons/md';
import CreateFolder from './CreateFolder';
import { Link } from 'react-router-dom';
export class CodeFolders extends Component {

    constructor(props) {
        super(props);
        this.state={folderStructure:this.props.folderStructure,
                    breadCrumbList: [{title:'Research',show:true}],
                    displayFolderCreationForm: false
        }
    }

    clickFolderHandler=()=>{
        const tempList = this.state.breadCrumbList;
        tempList[tempList.length -1].show=false;
        tempList.push({title:'Folder1',show:true});
        this.setState({breadCrumbList:tempList});
    };
    createFolderHandler=()=>{
        console.log("HELLo")
        this.setState({displayFolderCreationForm:!this.state.displayFolderCreationForm});
    };
    render() {
        return (
            <>
            <div style={{padding: '30px 0px 30px 20px', background:'#aeb9f7'}}>
                <h3>Files</h3>
            </div>
            <div style={{padding: '30px 0px 30px 20px', background:'#d8dbf0'}}>
                <Breadcrumb>
                    {this.state.breadCrumbList.map((folder)=>(
                        <Breadcrumb.Item active={folder.show}>{folder.title}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                <div style={{padding: '30px 0px 30px 20px', background:'#d8dbf0'}}>
                    <p>
                        The folder description comes here yo yo yo yo yo yo yo bye!
                    </p>
                </div >
                <div style={{padding: '30px 0px 30px 20px', background:'#d8dbf0'}}>
                        <ul>
                            <li><Link onClick={this.createFolderHandler}><span style={{fontSize:'40px'}}><MdIcons.MdCreateNewFolder /></span></Link></li>
                                {this.state.displayFolderCreationForm?<CreateFolder/>:''}
                            <hr/>
                            {this.state.folderStructure[0].subFolders.map((folder)=>(
                                <>
                                <li><FcIcons.FcFolder /><Link onClick={this.clickFolderHandler}><span>{folder.title}</span></Link></li>
                                <hr/>
                                </>
                            ))}
                        </ul>
                </div>
            </div>
            </>
        )
    }
}

export default CodeFolders

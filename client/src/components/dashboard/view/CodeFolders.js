import React, { Component } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import * as FcIcons from 'react-icons/fc';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import CreateFolder from './CreateFolder';
import CreateFile from './CreateFile';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class CodeFolders extends Component {

    constructor(props) {
        super(props);
        // this.state={folderStructure:this.props.folderStructure,
        //             breadCrumbList: [{title:'Research',show:true}],
        //             displayFolderCreationForm: false
        // }
        this.handlecallbackFolder = this.handlecallbackFolder.bind(this);
        this.handlecallbackFile = this.handlecallbackFile.bind(this);
        this.state = {
            currentFolderID: this.props.parentFolderID
            , currentFolder: [],
            subFolders: [],
            doRender: false,
            displayFolderCreationForm: false,
            displayFileCreationForm: false,
            breadCrumbList: ['']
        }
    }
    componentDidMount() {
        this.setState({ doRender: false });
        axios.get('/folders/' + this.state.currentFolderID)
            .then((response) => {
                this.setState({ currentFolder: response.data }, () => {
                    this.setState({ breadCrumbList: [this.state.currentFolder] })
                });
                (this.state.currentFolder.subfolders).map((subfolderID) => {
                    axios.get('/folders/' + subfolderID)
                        .then((resp) => {
                            this.setState({ subFolders: [...this.state.subFolders, resp.data] });
                        })
                })
                this.setState({ doRender: true });
            })
            .catch((error) => {
                console.log(error);
            })

    }
    static getDerivedStateFromProps(props, state) {

    }

    clickFolderHandler = (folder) => {
        this.state.currentFolderID = folder._id;
        this.state.currentFolder = folder;
        const index = (this.state.breadCrumbList).indexOf(this.state.currentFolder);
        if (index == -1) {
            this.setState({ breadCrumbList: [...this.state.breadCrumbList, folder] });
        }
        else {
            this.setState({ breadCrumbList: (this.state.breadCrumbList).slice(0, index + 1) });
        }
        this.state.subFolders = [];
        (this.state.currentFolder.subfolders).map(async (subfolderID) => {
            this.setState({ doRender: false })
            await axios.get('/folders/' + subfolderID)
                .then((resp) => {

                    this.setState({ subFolders: [...this.state.subFolders, resp.data] }, () => {
                        this.setState({ doRender: true });
                    })
                })
        })


    };
    createFolderHandler = () => {
        if (this.state.displayFileCreationForm && !this.state.displayFolderCreationForm)
            this.setState({ displayFileCreationForm: !this.state.displayFileCreationForm });
        this.setState({ displayFolderCreationForm: !this.state.displayFolderCreationForm });
    };
    createFileHandler = () => {
        if (!this.state.displayFileCreationForm && this.state.displayFolderCreationForm)
            this.setState({ displayFolderCreationForm: !this.state.displayFolderCreationForm });
        this.setState({ displayFileCreationForm: !this.state.displayFileCreationForm });
    }
    handlecallbackFolder = (toDoAfterFolderCreation) => {
        this.setState({
            displayFolderCreationForm: toDoAfterFolderCreation.displayFolderCreationForm,
            currentFolder: toDoAfterFolderCreation.currentFolder,
            subFolders: [...this.state.subFolders, toDoAfterFolderCreation.newFolder]
        })
    }
    handlecallbackFile = (toDoAfterFileCreation) => {
        this.setState({
            displayFileCreationForm: toDoAfterFileCreation.displayFileCreationForm,
            currentFolder: toDoAfterFileCreation.currentFolder
        }, () => {
            console.log(this.state.currentFolder);
        })

    }
    render() {
        return (
            this.state.doRender ?
                <>
                    <div style={{ padding: '30px 0px 30px 20px', background: '#aeb9f7' }}>
                        <h3>{this.state.currentFolder.name}</h3>
                    </div>
                    <div style={{ padding: '30px 0px 30px 20px', background: '#d8dbf0' }}>
                        <Breadcrumb>
                            {(this.state.breadCrumbList).map((folder, index) => (
                                <Breadcrumb.Item onClick={this.clickFolderHandler.bind(this, folder)} active={((this.state.breadCrumbList).length - 1 === index)}>{folder.name}</Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                        <div style={{ padding: '30px 0px 00px 20px', background: '#d8dbf0' }}>
                            <p>
                                {this.state.currentFolder.description}
                            </p>
                        </div >
                        <div style={{ padding: '30px 0px 30px 20px', background: '#d8dbf0' }}>
                            <ul>
                                {this.props.isCoAuthor?
                                <li>
                                    <Link onClick={this.createFolderHandler}><span style={{ fontSize: '40px' }}><MdIcons.MdCreateNewFolder /></span></Link>
                                    <Link onClick={this.createFileHandler}><span style={{ fontSize: '40px' }}><AiIcons.AiFillFileAdd /></span></Link>
                                </li>:''}
                                {this.state.displayFolderCreationForm ? <CreateFolder parentcallback={this.handlecallbackFolder} parentID={this.state.currentFolderID} /> : ''}
                                {this.state.displayFileCreationForm ? <CreateFile parentcallback={this.handlecallbackFile} parent={this.state.currentFolder} parentID={this.state.currentFolderID} /> : ''}
                                <hr />
                                {(this.state.currentFolder.files).map((file) => (
                                    <>
                                        <li><FcIcons.FcFile /><a download={file.name} href={file.base64} ><span>{file.name}</span></a><span style={{ float: 'right', padding: '0px 20px 0px 0px' }}>{file.description}</span></li>
                                        <hr/>
                                    </>
                                ))}
                                {this.state.subFolders.map((folder) => (
                                    <>
                                        <li><FcIcons.FcFolder /><Link onClick={this.clickFolderHandler.bind(this, folder)}><span>{folder.name}</span></Link><span style={{ float: 'right', padding: '0px 20px 0px 0px' }}>{folder.description}</span></li>
                                        <hr />
                                    </>
                                ))}
                            </ul>
                        </div>
                    </div>
                </> : ''
        )
    }
}

export default CodeFolders

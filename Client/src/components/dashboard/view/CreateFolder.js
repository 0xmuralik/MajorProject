import React,{useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
function CreateFolder(props) {
    const[folderDetails,setFolderDetails]=useState({namee:'',description:''});
    console.log(props.parentID)
    function submitHandler(e){
        e.preventDefault();
        const request ={name:folderDetails.namee,description:folderDetails.description,parentId:props.parentID};
        axios.post('/folders',request,
        {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("profile")).data.token
              }`,
            },
          })
          .then((response)=>{
              console.log(response);
              const toDoAfterFolderCreation={displayFolderCreationForm:false,currentFolder:response.data.updatedParentFolder,newFolder:response.data.newFolder}
              props.parentcallback(toDoAfterFolderCreation);
          })
          .catch((error)=>{
              console.log(error);
          })

    }
    function changeHandler(e){
        const det= folderDetails;
        console.log(e.target);
        det[e.target.name]=e.target.value;
        setFolderDetails(det);
        console.log(folderDetails);
    }
    return (
        <div class= 'col-lg-4 'style={{padding:'25px 0px 0px 15px'}}>
            <Form onSubmit={submitHandler}>
                <Form.Group >
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control name='namee' placeholder='Folder Name' onChange={changeHandler} type='text' value={folderDetails.name}></Form.Control>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='description' onChange={changeHandler} value={folderDetails.description} as='textArea' type="text" placeholder="Enter folder description here..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateFolder

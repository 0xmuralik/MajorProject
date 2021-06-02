import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import FileBase from 'react-file-base64';
function CreateFile(props) {
    const [fileDetails, setFileDetails] = useState({ namee: '', description: '', base64: '' });
    const [parentFolder, setParentFolder] = useState(props.parent);
    function submitHandler(e) {
        e.preventDefault();
        const request = { name: fileDetails.namee, description: fileDetails.description, base64: fileDetails.base64 };
        const parentFolderTemp = parentFolder;
        parentFolderTemp.files.push(request);
        setParentFolder(parentFolderTemp);
        axios.patch('/folders/' + props.parentID, parentFolder,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token
                        }`,
                },
            })
            .then((response) => {
                const toDoAfterFileCreation = { displayFileCreationForm: false, currentFolder: response.data }
                props.parentcallback(toDoAfterFileCreation);
            })
            .catch((error) => {
                console.log(error);
            })

    }
    function changeHandler(e) {
        const det = fileDetails;
        det[e.target.name] = e.target.value;
        setFileDetails(det);
    }
    return (
        <div class='col-lg-4 ' style={{ padding: '25px 0px 0px 15px' }}>
            <Form onSubmit={submitHandler}>
                <Form.Group >
                    <Form.Label>File Name</Form.Label>
                    <Form.Control name='namee' placeholder='File Name' onChange={changeHandler} type='text' value={fileDetails.name}></Form.Control>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='description' onChange={changeHandler} value={fileDetails.description} as='textArea' type="text" placeholder="Enter file description here..." />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Choose file to upload</Form.Label>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => {
                            const det = fileDetails
                            det.base64 = base64
                            setFileDetails(det)
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateFile

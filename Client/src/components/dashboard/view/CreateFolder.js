import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function CreateFolder() {
    return (
        <div class= 'col-lg-4 'style={{padding:'25px 0px 0px 15px'}}>
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control type="text" placeholder="Folder Name" />
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textArea' type="text" placeholder="Enter folder description here..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateFolder

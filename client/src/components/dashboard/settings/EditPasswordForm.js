import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditPasswordForm() {
    return (
        <div class='col-lg-4 ' style={{ padding: '25px 0px 0px 15px' }}>
            <Form>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" placeholder="Current password" />
                </Form.Group>
                <Form.Group controlId="formBasicNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" />
                </Form.Group>
                <Form.Group controlId="formBasicConfirmNewPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default EditPasswordForm

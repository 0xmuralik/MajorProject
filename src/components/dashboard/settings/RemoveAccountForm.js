import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function RemoveAccountForm() {
    return (
        <div class= 'col-lg-4 'style={{padding:'25px 0px 0px 15px'}}>
            <Form>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicConfirmNewPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Remove
                </Button>
            </Form>
        </div>
    )
}

export default RemoveAccountForm

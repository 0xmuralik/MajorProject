import React, { Component, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Form.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'



class RegisterForm extends Component {


    constructor() {
        super()
        this.state = {
            show: false
        }

    }

    selectedCities = (e) => {
        this.setState({ selectedCities: e.value });
    }
    render(props) {
        return (
            <div class="wrapper wrapper--w480">
                <Card bg='light'>
                    <Card.Header style={{ background: '#c2caf7' }}>
                        Registration
                    </Card.Header>
                    <Card.Body style={{ background: '#d8dbf0' }}>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control onChange={this.emailHandler} type='text' value={this.state.name}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.emailHandler} type='email' value={this.state.email}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.passwordHandler} type='password' value={this.state.password}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control onChange={this.passwordHandler} type='password' value={this.state.confirmPassword}></Form.Control>
                            </Form.Group>
                            <Button variant='primary' type="submit">Register</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    closeModal = () => {
        this.setState({ show: false })
    }

    openModal = () => {
        this.setState({ show: true })
    }
}
export default RegisterForm
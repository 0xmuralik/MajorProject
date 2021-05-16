import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Form.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LoginDetails } from '../../dashboard/Utils/LoginDetails';
import axios from 'axios';
//import Dashboard from './Dashboard';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class LoginForm extends Component {


    constructor(props) {
        super(props)
        this.state = { email: '',password:'' }
    }

    emailHandler = (event) => {
        console.log(`${event.target.value}`)
        this.setState({ email: event.target.value })
    }
    passwordHandler = (event) => {
        console.log(`${event.target.value}`)
        this.setState({ password: event.target.value })
    }
    submitHandler = (e) => {
        e.preventDefault();

        window.location='/dashboard'
    }


    render(props) {
        return (
            <div class="wrapper wrapper--w360">
                <Card >
                    <Card.Header style={{ background: '#c2caf7' }}>
                        Log In
                    </Card.Header>
                    <Card.Body style={{ background: '#d8dbf0' }}>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.emailHandler} type='email' value={this.state.email}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.passwordHandler} type='password' value={this.state.password}></Form.Control>
                            </Form.Group>
                            <Button variant='primary' type="submit">Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default LoginForm;
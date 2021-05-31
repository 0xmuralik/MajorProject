import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Form.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LoginDetails } from '../../dashboard/Utils/LoginDetails';
import axios from 'axios';
import {getNameLocalStorage} from '../../dashboard/Utils/UpdateLocalStorage.js'
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
        this.state = { formDetails:{
            name:'',
            emailOrUsername:'',
            password:'',
            username:'',
            domains:[],
            contact:'',
            description:'',
            displayPicture:'',
            likedPosts:[],
            savedPosts:[],
            viewedPosts:[]
        } }
    }

    changeHandler = (event) => {
        const details= this.state.formDetails;
        details[event.target.name] = event.target.value;
        this.setState({formDetails: details});
        console.log(this.state.formDetails)
    }
    submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/users/signin',this.state.formDetails)
        .then(response=>{console.log(response);
            localStorage.setItem('profile',JSON.stringify(response));
            axios.get('http://localhost:5000/users/get_id_and_name')
            .then(response=>{
                localStorage.setItem('userIdAndName',JSON.stringify(response));
                window.location='/dashboard'
            })
        });
        
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
                                <Form.Control name='emailOrUsername' onChange={this.changeHandler} type='email' value={this.state.formDetails.email}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control name='password' onChange={this.changeHandler} type='password' value={this.state.formDetails.password}></Form.Control>
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
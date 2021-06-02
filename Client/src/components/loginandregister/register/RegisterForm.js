import React, { Component, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Form.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import getNameLocalStorage from '../../dashboard/Utils/UpdateLocalStorage.js'



class RegisterForm extends Component {


    constructor() {
        super()
        this.state = {
            show: false,
            formDetails:{
                name:'',
                email:'',
                password:'',
                username:'',
                domains:[],
                contact:'',
                description:'',
                displayPicture:'',
                likedPosts:[],
                savedPosts:[],
                viewedPosts:[]
            },
            confirmPassword:''
        }

    }

    selectedCities = (e) => {
        this.setState({ selectedCities: e.value });
    }
    changeHandler=(e)=>{
        if(e.target.name=='confirmPassword'){
            this.setState({confirmPassword:e.target.value});
        }
        else{
        const details= this.state.formDetails;
        details[e.target.name]=e.target.value;
        if(e.target.name=='email')
            details['username']=(e.target.value).split('@')[0];
        this.setState({formDetails:details});
        console.log(this.state.formDetails);
        }
    }
    submitHandler=(e)=>{
        e.preventDefault();
        axios.post('/users/signup',this.state.formDetails)
        .then(response=>{console.log(response);
            localStorage.setItem('profile',JSON.stringify(response));
            axios.get('/users/get_id_and_name')
            .then(response=>{
                localStorage.setItem('userIdAndName',JSON.stringify(response));
                axios.get('/domains/getIdAndName')
                .then(response=>{
                    localStorage.setItem('domainIdAndName',JSON.stringify(response));
                    window.location='/dashboard'
                })
            })
        });
        
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
                                <Form.Control name='name' onChange={this.changeHandler} type='text' value={this.state.formDetails.name}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control name='email' onChange={this.changeHandler} type='email' value={this.state.formDetails.email}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control name='password' onChange={this.changeHandler} type='password' value={this.state.formDetails.password}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control name='confirmPassword' onChange={this.changeHandler} type='password' value={this.state.confirmPassword}></Form.Control>
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
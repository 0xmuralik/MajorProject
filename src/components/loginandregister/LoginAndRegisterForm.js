import React,{Component} from 'react';
import LoginForm from './login/LoginForm'
import RegisterForm from './register/RegisterForm';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button'
import './LoginAndRegisterForm.css'

class LoginAndRegisterForm extends Component{

    constructor(props){
        super(props)
    }

    render(props){
        let shouldRegisterFormVisible
        return(
            <div class='bg-loginandregister page-wrapper'>
                <Container>
                    <Row>
                        <div class='col-sm-5 div-padding-20p'> 
                            <Col>
                                <LoginForm parentcallback={this.props.parentcallback}/>
                            </Col>
                        </div>
                        <div class="col-sm-1 vl"></div>
                        <div class='col-sm-6 div-padding-150px'>
                            <Col>
                                <RegisterForm ref={this.regRef} />
                            </Col>
                        </div>
                    </Row>
                </Container>
            </div>

            // <div>
            //     <LoginForm parentcallback={this.props.parentcallback}/>
            //     <button onClick={this.registerHandler}>Register</button>
            //     <RegisterForm ref={this.regRef}/>
            // </div>
        )
    }
    
}
export default LoginAndRegisterForm
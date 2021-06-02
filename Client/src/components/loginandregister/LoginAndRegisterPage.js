import LoginAndRegisterForm from './LoginAndRegisterForm';
import React, { Component } from 'react';
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from "react-router-dom";


export class LoginAndRegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = { password: '', email: '' }
    this.handlecallback = this.handlecallback.bind(this);
  }

  handlecallback = (childValues) => {
    console.log(childValues)
    this.setState({ password: childValues.password, email: childValues.email })
    //this.props.history.push('/dashboard');
  }

  componentDidMount() {
    if (localStorage.getItem('profile')) {
      window.location = '/dashboard';
    }
  }
  render() {

    return (
      <Router>
        <div >
          <LoginAndRegisterForm parentcallback={this.handlecallback} />
        </div>
      </Router>
    );
  }
}

export default LoginAndRegisterPage

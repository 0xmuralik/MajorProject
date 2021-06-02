import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.css';
import { Link } from 'react-router-dom';
import * as CgIcons from 'react-icons/cg';
import Notification from '../notifications/Notification';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNotification: false
    };
  }
  handleNotification = () => {
    this.setState({ openNotification: !this.state.openNotification });
  }
  handleLogout = () => {
    localStorage.clear();
    window.location = '/'
  }
  render() {
    return (
      <div class="fixed-top">
        <Navbar class='navbar' expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link style={{ color: 'white' }}><Link to='/dashboard'>Home</Link></Nav.Link>
                <Nav.Link><Link onClick={this.handleNotification}>Notifications</Link></Nav.Link>
                <Link><NavDropdown style={{ color: 'white' }} title='Profile'>
                  <NavDropdown.Item>
                    <Link to='/profile'><CgIcons.CgProfile /><span>Profile</span></Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to='/settings'>Settings</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                </Link>
                <Nav.Link><Link onClick={this.handleLogout}>Log Out</Link></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Notification openNotification={this.state.openNotification} />
      </div>
    )
  }
}

export default Header

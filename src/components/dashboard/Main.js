import React from 'react'
import Header from './header/Header';
import SidePannel from './sidepannel/SidePannel';
import Dashboard from './home/Dashboard';
import UserProfile from './profile/UserProfile';
import View from './view/View'
import LoginAndRegisterPage from '../loginandregister/LoginAndRegisterPage'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {BrowserRouter as Router,Link,Switch,Route } from 'react-router-dom';
import Upload from './Upload/Upload';
import Notification from './notifications/Notification';
function Main() {
    return (
        <Router>
            <Header />
            <div>
                <Container fluid>
                    <Row>
                        <Col sm={2}>
                            <div style={{ top: '600px' }}>
                                <SidePannel />
                            </div>

                        </Col>
                        <Col sm={10}>
                            <Switch>

                                <Route path='/dashboard'>
                                    <Dashboard />
                                </Route>
                                
                                <Route path='/profile'>
                                    <UserProfile />
                                </Route>
                                <Route path='/view'>
                                    <View />
                                </Route>
                                <Route path='/upload'>
                                    <Upload />
                                </Route>
                             
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Router>
    )
}

export default Main

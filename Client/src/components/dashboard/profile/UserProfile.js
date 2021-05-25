import React, { Component, useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Form.css'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import rImg from "../Utils/Images/Rohith.JPG";
import { FaRegImage } from 'react-icons/fa';
import DisplayFeilds from './DisplayFields'
import { UserDetails } from "../Utils/UserDetails"
import * as IoIcons from 'react-icons/io';
import './UserProfile.css';
import UserActivity from './UserActivity';
import YourCommunities from './YourCommunities';
import Header from '../header/Header';
import SidePannel from '../sidepannel/SidePannel';

const formRef = React.createRef();

const UserProfile = () => {

    const [readOnly, handleEdit] = useState(true)
    const [details, setDetails] = useState(UserDetails)
    //setDetails(UserDetails)
    const uname=details.filter(field=>field.name=='Username')[0].value
    const desc=details.filter(field=>field.name=='Description')[0].value

    useEffect(async () => {
        window.scrollTo(0, 0)
    }, []);


    return (

        <>
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
                            <div style={{ position: 'relative', top: '150px' }}>
                                <Container>
                                    <Row>
                                        <Col xs={12} md="auto" width=''>
                                            <Card style={{ width: '20rem' }}>
                                                <Card style={{background:'#aeb9f7'}}>
                                                    <Image src={rImg} width="300" height="300" roundedCircle />
                                                    <Button type='file' className="ml-auto"><IoIcons.IoMdAdd/></Button>
                                                </Card>
                                                <Card.Body style={{background:'#d8dbf0'}}>
                                                    <Card.Title>
                                                        {uname}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        {desc}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={6} md={5}>
                                            <Form>
                                                <DisplayFeilds readOnly={readOnly} details={details} />
                                                <Button onClick={()=>handleEdit(!readOnly)} variant="primary">{readOnly?'Edit':'Discard'}</Button>
                                                <span>&nbsp;</span>
                                                <Button type="submit"  disabled={readOnly} variant="primary">Submit</Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>

                                <Container >
                                    <Row>
                                        <Col sm={10}>
                                        <UserActivity/>
                                        </Col>
                                    </Row>
                                </Container>
                            
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
       

    )
}

export default UserProfile

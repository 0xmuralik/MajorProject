import { React, useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as FaIcons from 'react-icons/fa';
import * as ViewData from '../Utils/ViewData';
import Carousel from 'react-bootstrap/Carousel'
import Accordion from 'react-bootstrap/Accordion'
import DiscussionForum from './DiscussionForum'
import Header from '../header/Header';
import SidePannel from '../sidepannel/SidePannel';
import CodeFolders from './CodeFolders';
import { codeFolderStructure } from '../Utils/CodeFolders';
import axios from 'axios'
import { useParams } from 'react-router';
import { Component } from 'react';
import {updateLocalStorage} from '../Utils/UpdateLocalStorage';

const View = () => {

    let { post_id } = useParams();
    const [doRender,setDoRender]=useState(false);
    const [postData, setpostData] = useState(
        {
            title: '',
            creator: '',
            author: '',
            organization: '',
            region: '',
            likes: [],
            views: [],
            image: [],
            future: '',
            workDone: '',
            Description: '',
            domain: '',
            tags: [],
            status: '',
            coAuthors: [],
            homeDirectory:[]
        })
    useEffect(async () => {
        if(!localStorage.getItem('profile')){
            window.location='/';
          }
        setDoRender(false);
        window.scrollTo(0, 0);
        await axios.patch('http://localhost:5000/posts/'+post_id+'/viewPost',{},
        {headers:{'Authorization':`Bearer ${JSON.parse(localStorage.getItem('profile')).data.token}`} })
        .then((response)=>{
            console.log(response);
            setpostData(response.data.updatedPost);
            updateLocalStorage(response.data.updatedUser);
            setDoRender(true);
        })
        
    }, []);

    return (
        doRender?
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
                            <div style={{ position: 'relative', top: '100px' }}>
                                <Card border="primary" style={{ width: '60rem' }}>
                                    <Card.Header style={{ background: '#aeb9f7' }}>
                                        <Container>
                                            <Row>
                                                <Col md={9}>
                                                    <h2>{postData.title}</h2>
                                                    <span></span>
                                                    <span>Created on {postData.createdOn}</span>
                                                </Col>
                                                <Col md={3}>
                                                    <h5><FaIcons.FaRegDotCircle color={postData.status == 'Pending' ? 'red' : 'green'} /> {postData.status}</h5>

                                                </Col>
                                            </Row>

                                            <Row>
                                                {console.log(postData, '===================')}
                                                <Col><Card.Link href="#">{postData.likes.length} Likes</Card.Link></Col>
                                                <Col><Card.Link href="#">{postData.views.length} Views</Card.Link></Col>
                                                <Col><Card.Link href="#">Share</Card.Link></Col>
                                            </Row>
                                        </Container>
                                    </Card.Header>
                                    <Card.Body style={{ background: '#d8dbf0' }}>
                                        <Card.Text>
                                            <h5>
                                                <b>{postData.author}</b>
                                                {postData.coAuthors && postData.coAuthors.map((field) => (
                                                    ` , ${field}`
                                                    // `${field.name} (${field.email}), `
                                                ))}
                                                <br />
                                                <b>Organization: </b>{postData.organization}
                                                <br />
                                                <b>Domain: </b>{postData.domain}
                                                <br />
                                                <b>Region: </b>{postData.region}
                                            </h5>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Body style={{ background: '#d8dbf0' }}>
                                        <Carousel>
                                            {/* {postData.image.map((img,ind)=>{
                                                <Carousel.Item height>
                                                <img height={300} width={100} alt='helo' src={postData.image[ind]} className="d-block w-100"/>
                                                <span>HELLo</span>
                                                </Carousel.Item>
                                            })} */}
                                                    <Carousel.Item height>
                                                    <img height={300} width={100} alt='helo' src={postData.image[0]} className="d-block w-100"/>
                                                    </Carousel.Item>
                                                    <Carousel.Item height>
                                                    <img height={300} width={100} alt='helo' src={postData.image[1]} className="d-block w-100"/>
                                                    </Carousel.Item>
                                            
                                        </Carousel>
                                    </Card.Body>
                                    <Card.Body style={{ background: '#d8dbf0' }}>
                                        <Card.Title>Brief Description</Card.Title>
                                        <Card.Text>{postData.Description}</Card.Text>
                                    </Card.Body>
                                    <Card.Body style={{ background: '#d8dbf0' }}>
                                        <Card.Title>Work done till date</Card.Title>
                                        <Card.Text>{postData.workDone}</Card.Text>
                                    </Card.Body>
                                    <Card.Body style={{ background: '#d8dbf0' }}>
                                        <Card.Title>Future Works</Card.Title>
                                        <Card.Text>{postData.future}</Card.Text>
                                    </Card.Body>
                                    <CodeFolders parentFolderID={postData.homeDirectory} />
                                    <Card.Body style={{ background: '#d8dbf0' }}>
                                        <Card.Title>Discussion Form</Card.Title>
                                            {console.log('00000000000000000000',postData.discussionForum)}
                                        {ViewData.discussion_form.length == 0 ?
                                            <p>No comments</p> :
                                            <DiscussionForum discussion_form_id={postData.discussionForum} />
                                        }
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>:''
    )
}


export default View
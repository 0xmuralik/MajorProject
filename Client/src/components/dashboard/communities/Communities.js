import React ,{useEffect, useState}from 'react'
import Container from 'react-bootstrap/Container';
import { yourCommunities } from "../Utils/YourCommunities"
import { suggestedCommunities } from "../Utils/SuggestedCommunities"
import CommunityCard from './CommunityCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../header/Header';
import SidePannel from '../sidepannel/SidePannel';
import YourCommunities from '../profile/YourCommunities'
import axios from 'axios'

function Communities() {

    const [subscribed, setsubscribed] = useState([])
    const [unsubscribed, setunsubscribed] = useState([])

    useEffect( () => {
        if(!localStorage.getItem('profile')){
            window.location='/';
          }
        window.scrollTo(0, 0)
        console.log(`Bearer ${JSON.parse(localStorage.getItem("profile")).data.token}`,'tokenn')
        setCommunities()
    },[]);

    const setCommunities=()=>{
        axios.get('/domains/subscribed_and_unsubscribed' ,{
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token}`,
            },
        })
        .then(response => {
            console.log(response, '-----------')
            setsubscribed(response.data.subscribed)
            setunsubscribed(response.data.unsubscribed)
        })
    }

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
                        <Row>
                                        <Col sm={4}>
                                        <YourCommunities/>
                                        </Col>
                                    </Row>
                        <div style={{ position: 'relative', top: '100px' }}>
                            <div style={{ padding: '50px 0px 50px 0px' }}>
                                <h3>Your Communities</h3>
                                <Container fluid>
                                    <Row>
                                        {subscribed.map((community) => (
                                            <CommunityCard community={community} setCommunities={setCommunities} isJoined={true}/>
                                        ))}
                                    </Row>
                                </Container>
                            </div>
                            <hr/>
                            <div style={{ padding: '50px 0px 50px 0px' }}>
                                <h3>Suggestions</h3>
                                <Container fluid>
                                    <Row>
                                        {unsubscribed.map((community) => (
                                            <CommunityCard community={community} setCommunities={setCommunities} isJoined={false}/>
                                        ))}
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
       
    )
}

export default Communities

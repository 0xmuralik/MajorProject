import React from 'react'
import Container from 'react-bootstrap/Container';
import { yourCommunities } from "../Utils/YourCommunities"
import { suggestedCommunities } from "../Utils/SuggestedCommunities"
import CommunityCard from './CommunityCard';
import Row from 'react-bootstrap/Row';

function Communities() {
    return (
        <div style={{ position: 'relative', top: '100px' }}>
            <div style={{ padding: '50px 0px 50px 0px' }}>
                <h3>Your Communities</h3>
                <Container fluid>
                    <Row>
                        {yourCommunities.map((community) => (
                            <CommunityCard community={community}/>
                        ))}
                    </Row>
                </Container>
            </div>
            <hr/>
            <div style={{ padding: '50px 0px 50px 0px' }}>
                <h3>Suggestions</h3>
                <Container fluid>
                    <Row>
                        {suggestedCommunities.map((community) => (
                            <CommunityCard community={community}/>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Communities

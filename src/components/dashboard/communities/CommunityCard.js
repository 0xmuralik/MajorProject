import React,{useState} from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CommunityCard(props) {
    const[isJoined,setJoined]=useState(props.community.joined);
    const handleJoinLeave = ()=>{
        setJoined(!isJoined);
    }
    return (
        <Col lg={3} sm={6} style={{ padding: '25px 0px 50px 0px' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.community.img} />
                <Card.Body style={{background:'#d8dbf0'}}>
                    <Card.Title>{props.community.title}</Card.Title>
                    <Card.Text>
                       {props.community.members}
                    </Card.Text>
                    <Button onClick={handleJoinLeave} variant={isJoined?'danger':'primary'}>{isJoined ? 'leave' : 'join'}</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CommunityCard

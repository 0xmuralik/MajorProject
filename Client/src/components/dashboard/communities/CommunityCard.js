import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function CommunityCard(props) {
    const handleJoinLeave = () => {
        axios.patch('/domains/' + props.community._id + '/subscribe', {}, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token}`,
            },
        })
            .then(response => {
                props.setCommunities()
            })

    }
    return (
        <Col lg={3} sm={6} style={{ padding: '25px 0px 50px 0px' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.community.img} />
                <Card.Body style={{ background: '#d8dbf0' }}>
                    <Card.Title>{props.community.name}</Card.Title>
                    <Card.Text>
                        {props.community.subscribers.length} members
                    </Card.Text>
                    <Button onClick={handleJoinLeave} variant={props.isJoined ? 'danger' : 'primary'}>{props.isJoined ? 'leave' : 'join'}</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CommunityCard

import React from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import rImg from "../Utils/Images/logo.jpeg";
function YourCommunities() {
    return (
        <div  class='pad'>
            <h3>Manage notifications</h3>
            <div class=''>
                
            <Carousel>
  <Carousel.Item>
  <div style={{background:'#aeb9f7',height:'300px'}}>
    <h3  class='pad-heading'  style={{textAlign:'center'}}>Artificial Intelligence</h3>
    <Form>
        <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Subscribe for post notifications" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox1">
        <Form.Check type="checkbox" label="Subscribe for collaborator notifications" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox2">
        <Form.Check type="checkbox" label="Subscribe for discussion notifications" />
        </Form.Group>
    </Form>
    </div>
  </Carousel.Item>
  <Carousel.Item>
    <div style={{background:'#aeb9f7',height:'300px'}}>
    <h3 class='pad-heading'  style={{textAlign:'center'}}>Augmented Reality</h3>
    <Form>
        <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Subscribe for post notifications" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox1">
        <Form.Check type="checkbox" label="Subscribe for collaborator notifications" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox2">
        <Form.Check type="checkbox" label="Subscribe for discussion notifications" />
        </Form.Group>
    </Form>
    </div>
  </Carousel.Item>
  <Carousel.Item>
  <div style={{background:'#aeb9f7',height:'300px'}}>
    <h3 class='pad-heading' style={{textAlign:'center'}}>Block Chain</h3>
    <Form>
        <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Subscribe for post notifications" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox1">
        <Form.Check type="checkbox" label="Subscribe for collaborator notifications" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox2">
        <Form.Check type="checkbox" label="Subscribe for discussion notifications" />
        </Form.Group>
    </Form>
    </div>
  </Carousel.Item>
  <Carousel.Item>
  <div style={{background:'#aeb9f7',height:'300px'}}>
    <h3 class='pad-heading'  style={{textAlign:'center'}}>Quantum Computing</h3>
    <Form>
        <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Subscribe for post notifications" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox1">
        <Form.Check type="checkbox" label="Subscribe for collaborator notifications" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox2">
        <Form.Check type="checkbox" label="Subscribe for discussion notifications" />
        </Form.Group>
    </Form>
    </div>
  </Carousel.Item>
</Carousel>
                    
            </div>
        </div>
    )
}

export default YourCommunities

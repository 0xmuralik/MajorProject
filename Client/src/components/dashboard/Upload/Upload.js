import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../header/Header';
import SidePannel from '../sidepannel/SidePannel';
import Form from 'react-bootstrap/Form'
import * as ViewData from '../Utils/ViewData'
import Button from 'react-bootstrap/Button'
import { Multiselect } from 'multiselect-react-dropdown';

function Upload() {
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
                            <div style={{ position: 'relative', top: '100px' }} class="page-wrapper bg-loginandregister p-t-130 p-b-100 font-poppins">
                                <div class="wrapper wrapper--w680" style={{ width: '800px' }}>
                                    <Form >
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>Title</Form.Label>
                                            <Col sm={10}>
                                                <Form.Control placeholder="Enter Title" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>Author</Form.Label>
                                            <Col sm={10}>
                                                <Form.Control as="select">
                                                    {ViewData.author_details.map((field) => (<option>{field.name}</option>))}
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>Co-Authors</Form.Label>
                                            <Col sm={10}>
                                                <Multiselect
                                                    options={ViewData.author_details} // Options to display in the dropdown
                                                    selectedValues={ViewData.author_details.selectedValues}
                                                    displayValue="name" // Property name to display in the dropdown options
                                                /></Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>

                                            <Form.Label column sm={2}>Organization</Form.Label>
                                            <Col sm={10}><Form.Control as="select">
                                                <option>org 1</option>
                                                <option>org 2</option>
                                                <option>org 3</option>
                                            </Form.Control></Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>Region</Form.Label>
                                            <Col sm={10}><Form.Control as="select">
                                                <option>region 1</option>
                                                <option>region 2</option>
                                                <option>region 3</option>
                                            </Form.Control></Col>

                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>Domain</Form.Label>
                                            <Col sm={10}><Form.Control as="select">
                                                <option>AI/ML</option>
                                                <option>Blockchain</option>
                                                <option>Augmented Reality</option>
                                            </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <div className="mb-3">
                                                <Form.Check inline label="Pending" type='radio' name="group1" />
                                                <Form.Check inline label="Completed" type='radio' name="group1" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>Select images</Form.Label>
                                            <Col sm={10}>
                                                <Form.File
                                                    id="custom-file"
                                                    label="Select Images"
                                                    custom
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>Description</Form.Label>
                                            <Col sm={10}><Form.Control as="textarea" rows={3} /></Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>Work Done</Form.Label>
                                            <Col sm={10}><Form.Control as="textarea" rows={3} /></Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>Future Work</Form.Label>
                                            <Col sm={10}><Form.Control as="textarea" rows={3} /></Col>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                </Button>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>

    )
}

export default Upload;

import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../header/Header';
import SidePannel from '../sidepannel/SidePannel';
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
                            <div class="wrapper wrapper--w680">
                                        <h2 class="title">New Research</h2>
                                        <form method="POST">
                                            <div class="row row-space">
                                                <div class="col-4">
                                                    <div class="input-group">
                                                        <label class="label">research title </label>
                                                        <input class="input--style-4" type="text" name="title"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row row-space">
                                                <div class="col-4">
                                                    <div class="input-group">
                                                        <label class="label">description</label>
                                                        <textarea class="input--style-4" type="text" name="description"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row row-space">
                                                <div class="col-4">
                                                    <div class="input-group">
                                                        <label class="label">keywords - Optional</label>
                                                        <input class="input--style-4" type="text" name="keywords"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row row-space">
                                                
                                                <div class="col-4">
                                                    <div class="input-group">
                                                        <label class="label">Status</label>
                                                        <div class="p-t-10">
                                                            <label class="radio-container m-r-45">Completed
                                                                <input type="radio"  name="gender"/>
                                                                <span class="checkmark"></span>
                                                            </label>
                                                            <label class="radio-container">In Progress
                                                                <input type="radio" name="gender"/>
                                                                <span class="checkmark"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="input-group">
                                                <label class="label">Domain</label>
                                                <div class="rs-select2 js-select-simple select--no-search">
                                                    <select name="domain">
                                                        <option disabled="disabled" selected="selected">Choose option</option>
                                                        <option>Subject 1</option>
                                                        <option>Subject 2</option>
                                                        <option>Subject 3</option>
                                                    </select>
                                                    <div class="select-dropdown"></div>
                                                </div>
                                            </div>
                                            <div class="row row-space">
                                                <div class="col-2">
                                                    <div class="input-group">
                                                        <label class="label">Organization</label>
                                                        <div class="rs-select2 js-select-simple select--no-search">
                                                            <select name="Organization">
                                                                <option disabled="disabled" selected="selected">Choose option</option>
                                                                <option>Add New</option>
                                                                <option>Subject 2</option>
                                                                <option>Subject 3</option>
                                                            </select>
                                                            <div class="select-dropdown"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-2">
                                                    <div class="input-group">
                                                        <label class="label">Region</label>
                                                        <div class="rs-select2 js-select-simple select--no-search">
                                                            <select name="region">
                                                                <option disabled="disabled" selected="selected">Choose option</option>
                                                                <option>Add New</option>
                                                                <option>Subject 2</option>
                                                                <option>Subject 3</option>
                                                            </select>
                                                            <div class="select-dropdown"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="p-t-15">
                                                <button class="btn btn--radius-2 btn--blue" onclick="window.open('./projectHome.html')" type="submit">Submit</button>
                                            </div>
                                        </form>
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

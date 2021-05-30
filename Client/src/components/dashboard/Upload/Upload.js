import React, { useState, Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Header from "../header/Header";
import SidePannel from "../sidepannel/SidePannel";
import Form from "react-bootstrap/Form";
import * as ViewData from "../Utils/ViewData";
import Button from "react-bootstrap/Button";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import { updateLocalStorage } from "../Utils/UpdateLocalStorage";
import FileBase from 'react-file-base64';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      creator: "",
      author: "",
      organization: "",
      region: "",
      image: [],
      future: "",
      workDone: "",
      Description: "",
      domain: "",
      tags: [],
      status: "",
      coAuthors: [],
      all_authors: [],
      all_domains: [],
    };
  }
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state, "stateeeeee");
    const request = {
      "title": this.state.title,
      // "creator":JSON.parse(localStorage.getItem('profile')).data.result._id,
      "author":this.state.author,
      "organization": this.state.organization,
      "region":this.state.region,
      "image":this.state.image,
      "future": this.state.future,
      "workDone": this.state.workDone,
      "Description": this.state.Description,
      "domain": this.state.domain,
      "tags": this.state.tags,
      "status": this.state.status,
      "coAuthors":this.state.coAuthors,
    }
    console.log(request)
    axios.post("http://localhost:5000/posts/", request, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("profile")).data.token
          }`,
        },
      })
      .then((response) => {
        console.log(response);
        updateLocalStorage(response.data.updatedUser);
        window.location = "/dashboard";
      });
  };
  authorHandler = (e) => {
    console.log(e.target.value);
    this.setState({ author: e.target.value });
    this.setState({ creator: e.target.value });
  };
  titleHandler = (e) => {
    this.setState({ title: e.target.value });
  };
  coAuthorsHandler = (e) => {
    const coAuthors = e.map((mem) => mem._id);
    this.setState({ coAuthors: coAuthors });
  };
  orghandler = (e) => {
    this.setState({ organization: e.target.value });
  };
  reghandler = (e) => {
    this.setState({ region: e.target.value });
  };
  domainHandler = (e) => {
    this.setState({ domain: e.target.value });
  };
  statusPendingHandler = (e) => {
    this.setState({ status: "Pending" });
  };
  statusCompletedHandler = (e) => {
    this.setState({ status: "Completed" });
  };
  descriptionHandler = (e) => {
    this.setState({ Description: e.target.value });
  };
  workdoneHandler = (e) => {
    this.setState({ workDone: e.target.value });
  };
  futureworkHandler = (e) => {
    this.setState({ future: e.target.value });
  };
  componentDidMount() {
    if (!localStorage.getItem("profile")) {
      window.location = "/";
    }
    window.scrollTo(0, 0);
    axios.get("http://localhost:5000/domains/", {})
      .then(resp => {
        console.log(resp, 'domaiiiiiiiiin')
        this.setState({ all_domains: resp.data })
      })
    axios.get("http://localhost:5000/users/", {})
      .then(resp => {
        console.log(resp)
        this.setState({ all_authors: resp.data })
      })
  }

  render() {
    return (
      <>
        <Header />
        <div>
          <Container fluid>
            <Row>
              <Col sm={2}>
                <div style={{ top: "600px" }}>
                  <SidePannel />
                </div>
              </Col>
              <Col sm={10}>
                <div
                  style={{ position: "relative", top: "100px" }}
                  class="page-wrapper bg-loginandregister p-t-130 p-b-100 font-poppins"
                >
                  <div class="wrapper wrapper--w680" style={{ width: "800px" }}>
                    <Form onSubmit={this.submitHandler}>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Title
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            onChange={this.titleHandler}
                            placeholder="Enter Title"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Author
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            onChange={this.authorHandler}
                            as="select"
                          >
                            <option>-Select-</option>
                            {this.state.all_authors.map((field) => (<option value={field._id}>{field.name}</option>))}
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Co-Authors
                        </Form.Label>
                        <Col sm={10}>
                          <Multiselect
                            onSelect={this.coAuthorsHandler}
                            options={this.state.all_authors} // Options to display in the dropdown
                            selectedValues={
                              this.state.all_authors.selectedValues
                            }
                            displayValue="name" // Property name to display in the dropdown options
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Organization
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control onChange={this.orghandler} as="select">
                            <option>-Select-</option>
                            <option>Lab</option>
                            <option>Private</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Region
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control onChange={this.reghandler} as="select">
                            <option>-Select-</option>
                            <option>region 1</option>
                            <option>region 2</option>
                            <option>region 3</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Domain
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            onChange={this.domainHandler}
                            as="select"
                          >
                            <option>-Select-</option>
                            {this.state.all_domains.map((field) => (<option value={field._id}>{field.name}</option>))}
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <div className="mb-3">
                          <Form.Check
                            onChange={this.statusPendingHandler}
                            inline
                            label="Pending"
                            type="radio"
                            name="group1"
                          />
                          <Form.Check
                            onChange={this.statusCompletedHandler}
                            inline
                            label="Completed"
                            type="radio"
                            name="group1"
                          />
                        </div>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Select images
                        </Form.Label>
                        <Col sm={10}>
                          <FileBase 
                          type="file"
                          multiple={true}
                          onDone={({... base64})=>this.setState({image: Object.keys(base64).map((key)=>base64[key].base64)},()=>(console.log(this.state)))}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Description
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            onChange={this.descriptionHandler}
                            as="textarea"
                            rows={3}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Work Done
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            onChange={this.workdoneHandler}
                            as="textarea"
                            rows={3}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Future Work
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            onChange={this.futureworkHandler}
                            as="textarea"
                            rows={3}
                          />
                        </Col>
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
    );
  }
}

export default Upload;

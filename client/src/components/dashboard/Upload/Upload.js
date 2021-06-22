import React, { useState, Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Header from "../header/Header";
import SidePannel from "../sidepannel/SidePannel";
import Form from "react-bootstrap/Form";
// import * as ViewData from "../Utils/ViewData";
import Button from "react-bootstrap/Button";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import { updateLocalStorage } from "../Utils/UpdateLocalStorage";
import FileBase from 'react-file-base64';

class Upload extends Component {
  constructor(props) {
    super(props);
    let post_id=undefined;
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
      fullPost:{}
    };
    if(this.props.match){
    post_id = this.props.match.params.post_id;
    axios.get('/posts/'+ post_id ).then((response)=>{
      console.log(response.data);
      this.setState({
        title: response.data.title,
        creator: response.data.creator,
        author: response.data.author,
        organization: response.data.organization,
        region: response.data.region,
        image: response.data.image,
        future: response.data.future,
        workDone: response.data.workDone,
        Description: response.data.Description,
        domain: response.data.domain,
        tags: response.data.tags,
        status: response.data.status,
        coAuthors: response.data.coAuthors,
        fullPost: response.data
      })
    })
    }

  }
  submitHandler = (e) => {
    e.preventDefault();
    let request = this.state.fullPost;
    request.title=this.state.title;
    request.creator=this.state.creator;
    request.author=this.state.author;
    request.organization=this.state.organization;
    request.region=this.state.region;
    request.image=this.state.image;
    request.future=this.state.future;
    request.workDone=this.state.workDone;
    request.Description=this.state.Description;
    request.domain=this.state.domain;
    request.tags=this.state.tags;
    request.status=this.state.status;
    request.coAuthors=this.state.coAuthors;

    console.log(request);

    if(this.props.match){
      axios.patch("/posts/"+ this.props.match.params.post_id, request, {
        headers:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token
          }`,
        },
      })
      .then((response)=>{
        window.location="/view/"+response.data._id;
      })
    }
    else{
    axios.post("/posts/", request, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token
          }`,
      },
    })
      .then((response) => {
        updateLocalStorage(response.data.updatedUser);
        window.location = "/view/"+response.data.newPost._id;
      });
    }
  };
  authorHandler = (e) => {
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
    axios.get("/domains/", {})
      .then(resp => {
        this.setState({ all_domains: resp.data })
      })
    axios.get("/users/", {})
      .then(resp => {
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
                            value={this.state.title}
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
                            value={this.state.author}
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
                          <Form.Control onChange={this.orghandler} value={this.state.organization} as="select">
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
                          <Form.Control onChange={this.reghandler} value={this.state.region} as="select">
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
                            checked={this.state.status=="Pending"}
                          />
                          <Form.Check
                            onChange={this.statusCompletedHandler}
                            inline
                            label="Completed"
                            type="radio"
                            name="group1"
                            checked={this.state.status=="Completed"}
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
                            onDone={({ ...base64 }) => this.setState({ image: Object.keys(base64).map((key) => base64[key].base64) }, () => (console.log(this.state)))}
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
                            value={this.state.Description}
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
                            value={this.state.workDone}
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
                            value={this.state.future}
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

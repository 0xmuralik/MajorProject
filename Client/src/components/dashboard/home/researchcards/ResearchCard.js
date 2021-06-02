import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import rImg from "../../Utils/Images/Rohith.JPG";
import AbstractModal from "./AbstractModal";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io5";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
import { updateLocalStorage, getNameLocalStorage } from "../../Utils/UpdateLocalStorage";

//import './LoginForm.css'
export class ResearchCard extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.state = {
      isLiked: this.props.details.likes.includes(
        JSON.parse(localStorage.getItem("profile")).data.result._id
      )
        ? true
        : false,
      isSaved: this.props.details.saves.includes(
        JSON.parse(localStorage.getItem("profile")).data.result._id
      )
        ? true
        : false,
      details: this.props.details,
    };
  }

  openAbstractModal = () => {
    this.modalRef.current.openAbstractModal();
  };
  handleLike = () => {
    this.setState({ isLiked: !this.state.isLiked });
    axios
      .patch(
        "/posts/" + this.props.details._id + "/likePost",
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token
              }`,
          },
        }
      )
      .then((response) => {
        this.setState({ details: response.data.updatedPost });
        updateLocalStorage(response.data.updatedUser);
      });
  };
  handleSave = () => {
    this.setState({ isSaved: !this.state.isSaved });
    axios
      .patch(
        "/posts/" + this.props.details._id + "/savePost",
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token
              }`,
          },
        }
      )
      .then((response) => {
        this.setState({ details: response.data.updatedPost });
        updateLocalStorage(response.data.updatedUser);
      });
  };
  render() {
    return (
      <>
        <div style={{ padding: "50px" }} class="wrapper wrapper--w640">
          <Card>
            <Card.Header style={{ height: "70px", background: "#aeb9f7" }}>
              <Container>
                <Row>
                  <Col md={2}>
                    <Image width="40" height="35" src={rImg} roundedCircle />
                  </Col>
                  <Col md={9}>
                    <Row>
                      <Link to="/profile">
                        <h5>{getNameLocalStorage(this.state.details.creator)}</h5>
                      </Link>
                    </Row>
                    <Row>
                      <h7>{this.state.details.createdOn}</h7>
                    </Row>
                  </Col>
                  <Col md={1}>
                    <Link to={"/view/" + this.state.details._id}>
                      <IoIcons.IoEyeSharp size={40} />
                    </Link>
                  </Col>
                </Row>
              </Container>
            </Card.Header>
            <Card.Body style={{ background: "#d8dbf0" }}>
              <Card.Title>{this.state.details.title}</Card.Title>
              <Card.Subtitle>{this.state.details.status}</Card.Subtitle>
              <Card.Img height={300} variant="top" src={this.state.details.image[0]} />
              <hr />
              <Card.Text>
                {this.state.details.Description}
                <Card.Link onClick={this.openAbstractModal}>
                  Read More
                </Card.Link>
              </Card.Text>

              <div>
                <span>{this.state.details.likes.length} likes</span>
                <ButtonToolbar className="justify-content-between">
                  <ButtonGroup className="mr-2">
                    <Button
                      variant={!this.state.isLiked ? "secondary" : "primary"}
                      onClick={this.handleLike}
                    >
                      {!this.state.isLiked ? (
                        <AiIcons.AiFillLike />
                      ) : (
                          <AiIcons.AiFillDislike />
                        )}
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button
                      onClick={this.handleSave}
                      variant={!this.state.isSaved ? "secondary" : "primary"}
                    >
                      {!this.state.isSaved ? "Save" : "UnSave"}
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </Card.Body>
          </Card>
        </div>
        <AbstractModal
          title={this.state.details.title}
          abstract={this.state.details.Description}
          ref={this.modalRef}
        />
      </>
    );
  }
}

export default ResearchCard;

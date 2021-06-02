import React, { Component } from 'react';
import ResearchCard from '../home/researchcards/ResearchCard';
import Header from "../header/Header";
import SidePannel from "./SidePannel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import {useLocation } from 'react-router-dom';


export class YourPosts extends Component {
    constructor(props){
        super(props);
        this.state={details:[],savedPostIds:JSON.parse(localStorage.getItem('profile')).data.result.createdPosts}
        
    }
    componentDidMount(){
        this.state.savedPostIds.map((id)=>{
             axios.get('/posts/' + id, {})
            .then(response => {
                this.setState({details:[...this.state.details,response.data]});
                console.log(this.state.details, '-----------');
            })
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
                <div class="sticky-top" style={{ top: "60px" }}></div>
                <div style={{ position: "relative", top: "90px" }}>
                {this.state.details.map((result,index) => {
                return (
                <a>
                    <ListGroup horizontal={true} className="my-2" key={result._id}>
                    <ResearchCard details={result} />
                    </ListGroup>
                </a>
                );
          })}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
        )
    }
}

export default YourPosts;

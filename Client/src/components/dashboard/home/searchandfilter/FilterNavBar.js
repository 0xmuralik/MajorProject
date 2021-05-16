import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import SearchBar from "./SearchBar";
import FilterDropDowns from "./FilterDropDowns";
import { options } from "../../Utils/DropDownOprions";
import ListGroup from "react-bootstrap/ListGroup";
import UseFiltersToggle from "./UseFiltersToggle";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class FilterNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.dropDownOptions = options;
  }

  render() {
    this.filterDropDownsComponent = this.dropDownOptions.map((details) => (
      <FilterDropDowns details={details} />
    ));

    return (
      <div>
        <Navbar style={{ background: "white" }} expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Container>
            <Row>
              <Navbar.Collapse id="basic-navbar-nav">
                <UseFiltersToggle />
                <Nav className="mr-auto">{this.filterDropDownsComponent}</Nav>
              </Navbar.Collapse>
            </Row>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default FilterNavBar;

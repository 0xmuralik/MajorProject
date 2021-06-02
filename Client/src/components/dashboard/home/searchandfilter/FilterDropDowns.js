import React, { Component } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import ListGroup from 'react-bootstrap/ListGroup'
export class FilterDropDowns extends Component {

    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        const title = this.props.details.title
        const fields = this.props.details.fields
        this.navDropDown = fields.map((details) => (
            <NavDropdown.Item >{details.option}</NavDropdown.Item>
        ))
        return (
            <NavDropdown title={title} id="basic-nav-dropdown">
                {this.navDropDown}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">No Filter</NavDropdown.Item>
            </NavDropdown>
        )
    }
}

export default FilterDropDowns;

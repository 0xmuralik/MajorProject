import React, { Component } from 'react'
import './UseFiltersToggle.css';
import Col from "react-bootstrap/Col";

export class UseFiltersToggle extends Component {
    render() {
        return (
            <Col>
                <label class="switch">
                <input type="checkbox"/>
                <span class="slider round"></span>
                </label>
            </Col>
        )
    }
}

export default UseFiltersToggle

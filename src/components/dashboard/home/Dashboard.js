import React, { Component } from 'react'
import FilterNavBar from './searchandfilter/FilterNavBar'
//import SearchBar from './SearchBar'
//import ProcessResearchCards from './ProcessResearchCards';
import Header from '../header/Header';
import SidePannel from '../sidepannel/SidePannel';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import ViewPage from './viewpapers/ViewPage';
import UserProfile from '../profile/UserProfile'
import { ProcessResearchCards } from "./researchcards/ProcessResearchCards";

export class Dashboard extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)
        return (
            <>
                <div class="sticky-top" style={{ top: '60px' }}>
                    <FilterNavBar />
                </div>
                <div style={{ position: 'relative', top: '90px' }}>
                    < ProcessResearchCards />
                </div>
            </>
        )
    }
}

export default Dashboard
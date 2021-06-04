import React, { Component } from 'react'
import { details } from '../../Utils/ResearchDetails'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ResearchCard from './ResearchCard'
export class ProcessResearchCards extends Component {

    constructor(props) {
        super(props);
        this.researchDetails = details;
    }

    render() {
        this.renderr = this.researchDetails.map((details) => (
            <Container  >
                <Row >
                    <ListGroup horizontal={true} className="my-2" key={details.id}>
                        <ResearchCard details={details} />
                    </ListGroup>
                </Row>

            </Container>
        ))
        return (
            <div >
                {this.renderr}
            </div>
        )
    }
}

export default ProcessResearchCards

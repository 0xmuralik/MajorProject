import Modal from "react-bootstrap/Modal";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export class AbstractModal extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpened: false };
  }

  openAbstractModal = () => {
    this.setState({ isModalOpened: true });
  };
  closeAbstractModal = () => {
    this.setState({ isModalOpened: false });
  };
  render() {
    return (
      <div>
        <Modal
          centered
          show={this.state.isModalOpened}
          onHide={this.closeAbstractModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.abstract}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeAbstractModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AbstractModal;

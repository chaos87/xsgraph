import React from 'react';
import Modal from 'react-bootstrap/Modal'
import './Instructions.css'

class Instructions extends React.Component {
  render () {
    return(
        <Modal
            id="instructions"
            size="lg"
            show={this.props.showInstructions}
            onHide={() => this.props.setShowInstructions(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Welcome to Noisedge
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul>
                <li>Search for artists, albums, labels or showrooms using the search bar</li>
                <li>Expand nodes by clicking on them</li>
                <li>Once a node is clicked, display related info by clicking the INFO button</li>
            </ul>
        </Modal.Body>
      </Modal>
    )
  };
}

export default Instructions;

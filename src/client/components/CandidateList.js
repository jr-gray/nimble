import React, { Component } from 'react';
import axios from 'axios';
import CandidateListEntry from './CandidateListEntry';
import { Button, Modal, Navbar } from 'react-bootstrap';

export default class CandidateList extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [],
      selectedCandidate: '',
      showModal: false
    }
    this.getData = this.getData.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  open(selectedCandidate) {
    this.setState({ selectedCandidate }, () => {
      this.setState({ showModal: true });
    });
  } 
  
  close() {
    this.setState({ showModal: false });
  }

  getData() {
    axios.get('/api/getData')
    .then(response => {
      let candidates = response.data;
      this.setState({ candidates });
    })
    .catch(err => console.log(err));
  }

  render() {

    return (
      <div className="container">

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedCandidate.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {<p className="candidate-info">id: {this.state.selectedCandidate.id}</p>}
            {<p className="candidate-info">username: {this.state.selectedCandidate.username}</p>}
            {<p className="candidate-info">name: {this.state.selectedCandidate.name}</p>}
            {<p className="candidate-info">email: {this.state.selectedCandidate.email}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <div>
          {this.state.candidates.map((candidate, index) =>
            <CandidateListEntry candidate={candidate} key={index} handleClick={this.open} />
          )}
        </div>
      </div>
    )
  }
}
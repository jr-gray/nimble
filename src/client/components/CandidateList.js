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
      showModal: false,
      sort: ''
    }
    this.getData = this.getData.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.sortData = this.sortData.bind(this);
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

  sortData() {
    let candidates = this.state.candidates;
    let sort = this.state.sort;

    if (sort === 'desc') {
      // sort ascending
      // set new candidates list
      // set state to 'asc'
      candidates.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) ); 
      this.setState({ candidates }, () => this.setState({ sort: 'asc' }));
    } else {
      candidates.sort((a,b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0) ); 
      this.setState({ candidates }, () => this.setState({ sort: 'desc' }));
    }
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

        <div className="row candidate-list-header">
          <div className="col-md-2 text-center sort-header" onClick={this.sortData}>Applicant</div>
          <div className="col-md-1"></div>
          <div className="col-md-3">Status</div>
          <div className="col-md-1">Application Date</div>
          <div className="col-md-2">Last Action</div>
          <div className="col-md-2">Location</div>
          <div className="col-md-1">Go To Profile</div>
        </div>

        <div>
          {this.state.candidates.map((candidate, index) =>
            <CandidateListEntry candidate={candidate} key={index} handleClick={this.open} />
          )}
        </div>
      </div>
    )
  }
}
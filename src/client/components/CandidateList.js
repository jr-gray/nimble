import React, { Component } from 'react';
import axios from 'axios';
import CandidateListEntry from './CandidateListEntry';
import { Button, Modal } from 'react-bootstrap';

export default class CandidateList extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [],
      selectedCandidate: '',
      showModal: false,
      name: '',
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

  sortData(e) {
    let candidates = this.state.candidates;
    let id = e.target.id;
    let sort = this.state[id];

    if (sort === 'desc') {
      candidates.sort((a,b) => (a[id] > b[id]) ? 1 : ((b[id] > a[id]) ? -1 : 0) ); 
      this.setState({ candidates }, () => this.setState({ [id]: 'asc' }));
    } else {
      candidates.sort((a,b) => (b[id] > a[id]) ? 1 : ((a[id] > b[id]) ? -1 : 0) ); 
      this.setState({ candidates }, () => this.setState({ [id]: 'desc' }));
    }
  }

  render() {

    let candidate = this.state.selectedCandidate;
    let phone = candidate.profile ? candidate.profile.phone_cell : 'None';

    return (
      <div className="container">

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{candidate.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {<p className="candidate-info">ID: {candidate.id}</p>}
            {<p className="candidate-info">Username: {candidate.username}</p>}
            {<p className="candidate-info">Applicant Name: {candidate.name}</p>}
            {<p className="candidate-info">Applicant Email: {candidate.email}</p>}
            {<p className="candidate-info">Applicant Phone: {phone}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <div className="row candidate-list-header">
          <div className="col-md-2 sort-header" id="name" onClick={this.sortData}>Applicant</div>
          <div className="col-md-1"></div>
          <div className="col-md-3">Status</div>
          <div className="col-md-1">App. Date</div>
          <div className="col-md-2 action">Last Action</div>
          <div className="col-md-2">Location</div>
          <div className="col-md-1">Profile</div>
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
import React, { Component } from 'react';
import axios from 'axios';

export default class CandidateList extends Component {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    console.log('getData invoked client side!');
    axios.get('/api/getData')
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}
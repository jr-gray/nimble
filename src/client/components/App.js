import React, { Component } from 'react';
import CandidateList from './CandidateList';
import NavBar from './NavBar';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CandidateList />
      </div>
    )
  }
}
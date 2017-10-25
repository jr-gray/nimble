import React, { Component } from 'react';

export default class CandidateListEntry extends Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
  }

  open() {
    this.props.handleClick(this.props.candidate);
  }

  render() {
    let candidate = this.props.candidate;

    // change date format to mm/dd/yyyy
    let date = new Date(candidate.applications[0].role.created);
    let applicationDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();

    // function to change color of status circle depending on application status
    const statusCircle = () => {
      let status = candidate.applications[0].status;
      if (status === 'Offer Sent' || status === 'Phone Screen' || status === 'Hired') {
        return (<svg width="32" height="16">
                  <circle cx="8" cy="8" r="8" fill="aquamarine" />
                </svg>)
      } else if (status === 'Passed') {
        return (<svg width="32" height="16">
                  <circle cx="8" cy="8" r="8" fill="red" />
                </svg>)
      } else {
        return (<svg width="32" height="16">
                  <circle cx="8" cy="8" r="8" fill="cornflowerblue" />
                </svg>)
      }
    }

    return (
      <div className="row list-entry" onClick={this.open}>
        <div className="col-md-2">
          <p className="name">{candidate.name}</p> 
          <p className="email">{candidate.email}</p>
        </div>
        <div className="col-md-1"> </div>
        <div className="col-md-3 entry-margin">
          {statusCircle()}
          {candidate.applications[0].status}
        </div>
        <div className="col-md-1 entry-margin"><p>{applicationDate}</p></div>
        <div className="col-md-2 entry-margin action">{'No Action'}</div>
        <div className="col-md-2 entry-margin">{candidate.profile.address_city}</div>
        <div className="col-md-1 entry-margin">&rarr;</div>
      </div>
    )
  }
}
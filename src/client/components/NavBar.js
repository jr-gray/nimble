import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <Navbar className="nav" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            search for candidates who fit your criteria
          </Navbar.Brand>
          <Navbar.Toggle /> 
        </Navbar.Header>
        <Navbar.Collapse>

          <Nav pullRight>
            <NavItem eventKey={4}>x Clear</NavItem>
          </Nav>

          <Nav pullRight>
            <NavDropdown eventKey={3} title="More Filters" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Location</MenuItem>
              <MenuItem eventKey={3.2}>Name</MenuItem>
            </NavDropdown>
          </Nav>

          <Nav pullRight>
            <NavDropdown eventKey={2} title="Status" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Offer Sent</MenuItem>
              <MenuItem eventKey={2.2}>Phone Screen</MenuItem>
              <MenuItem eventKey={2.3}>Hired</MenuItem>
              <MenuItem eventKey={2.4}>Resume Review</MenuItem>
              <MenuItem eventKey={2.5}>Passed</MenuItem>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    )
  }
}
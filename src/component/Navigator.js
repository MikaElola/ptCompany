import"bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Navigator extends Component {
  render() {
    return (
        <nav class="navbar navbar-expand-lg  navbar-light bg-light">
        <Link class="navbar-brand" to="/">Home</Link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <Link class="nav-link" to="/customers">Customers</Link>
            </li>
            <li class="nav-item active">
                <Link class="nav-link" to="/trainings">Trainings</Link>
            </li>
            <li class="nav-item active">
                <Link class="nav-link" to="/calendar">Calendar</Link>
            </li>
        </ul>
        </div>
        </nav>
    );
  }
}

export default Navigator;

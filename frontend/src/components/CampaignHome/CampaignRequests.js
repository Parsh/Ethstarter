import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CampaignRequests extends Component {
  state = {};

  render() {
    return (
      <div className="container animated fadeIn">
        <Link to={this.props.match.url + '/create-request'}>
          <button className="btn btn-primary">
            Create Request (Manager Only)
          </button>
        </Link>
      </div>
    );
  }
}

export default CampaignRequests;

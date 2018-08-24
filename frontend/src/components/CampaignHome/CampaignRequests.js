import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Campaign from '../../ethereum/campaign';

class CampaignRequests extends Component {
  state = {
    requests: []
  };

  async componentDidMount() {
    const campaign = Campaign(this.props.match.params.id);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestsCount, 10))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    this.setState({ requests });
  }

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

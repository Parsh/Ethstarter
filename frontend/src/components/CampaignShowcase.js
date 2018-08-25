import React, { Component } from 'react';
import { ShowCard, Jumbotron } from './ui-components/mdb-stateless-components';
import { Link } from 'react-router-dom';

import factory from '../ethereum/factory';

class CampaignShowcase extends Component {
  state = {
    renderCampaigns: null
  };

  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    const campaignCards = campaigns.map(address => {
      return <ShowCard address={address} key={address} route={address} />;
    });

    this.setState({ renderCampaigns: campaignCards });
  }

  render() {
    return (
      <div className="container mt-5 mb-5 animated fadeIn">
        <div className="clearfix">
          <Link to="/create-campaign">
            <button type="button" className="btn btn-primary float-right">
              Create Campaign
            </button>
          </Link>
        </div>
        <h1 className="mt-2">Open Campaigns</h1>
        <div className="mt-5">{this.state.renderCampaigns}</div>
      </div>
    );
  }
}

export default CampaignShowcase;

import React, { Component } from 'react';
import { ShowCard } from './ui-components/mdb-stateless-components';
import { Link } from 'react-router-dom';

import factory from '../ethereum/factory';

class CampaignShowcase extends Component {
  state = {
    campaigns: []
  };

  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    this.setState({ campaigns });
  }

  renderCampaigns() {
    const campaignCards = this.state.campaigns.map(address => {
      return <ShowCard title={address} key={address} route={address} />;
    });
    return campaignCards;
  }

  render() {
    return (
      <div className="container animated fadeIn mt-5 mb-5">
        <div className="clearfix">
          <Link to="/create-campaign">
            <button type="button" className="btn btn-primary float-right">
              Create Campaign
            </button>
          </Link>
        </div>
        <h1 className="mt-2">Open Campaigns</h1>
        <div className="mt-4">{this.renderCampaigns()}</div>
      </div>
    );
  }
}

export default CampaignShowcase;

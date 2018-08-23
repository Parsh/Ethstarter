import React, { Component } from 'react';
import { Card } from './ui-components/mdb-stateless-components';
import { Link } from 'react-router-dom';

class CampaignShowcase extends Component {
  renderCampaigns() {
    const campaignCards = this.props.campaigns.map(address => {
      return <Card title={address} key={address} />;
    });

    return campaignCards;
  }

  render() {
    return (
      <div className="container animated fadeIn mt-5">
        <div className="clearfix">
          <Link to="/create">
            <button type="button" className="btn btn-primary float-right">
              Create Campaign
            </button>
          </Link>
        </div>
        <h1 className="mt-2">Open Campaigns</h1>
        <div className="mt-5">{this.renderCampaigns()}</div>
      </div>
    );
  }
}

export default CampaignShowcase;

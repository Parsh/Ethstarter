import React, { Component } from 'react';
import { Card } from './ui-components/mdb-stateless-components';

class CampaignShowcase extends Component {
  renderCampaigns() {
    const campaignCards = this.props.campaigns.map(address => {
      return <Card title={address} key={address} />;
    });

    return campaignCards;
  }

  render() {
    return (
      <div className="container mt-5">
        <div class="clearfix">
          <button type="button" class="btn btn-primary float-right">
            Create Campaign
          </button>
        </div>
        <h1 className="mt-2">Open Campaigns</h1>
        <div className="mt-5">{this.renderCampaigns()}</div>
      </div>
    );
  }
}

export default CampaignShowcase;

import React, { Component } from 'react';
import { Card, Jumbotron } from './ui-components/mdb-stateless-components';

class CampaignShowcase extends Component {
  renderCampaigns() {
    const campaignCards = this.props.campaigns.map(address => {
      return <Card title={address} key={address} />;
    });

    return campaignCards;
  }

  render() {
    return (
      <div>
        <Jumbotron
          title="Ethstarter: Bringing creative projects to life!"
          buttonText="Start a Campaign"
        />
        <div className="container mt-5">
          <div class="clearfix">
            <button type="button" class="btn btn-primary float-right">
              Create Campaign
            </button>
          </div>
          <h1 className="mt-2">Open Campaigns</h1>
          <div className="mt-4">{this.renderCampaigns()}</div>
        </div>
      </div>
    );
  }
}

export default CampaignShowcase;

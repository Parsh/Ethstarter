import React, { Component } from 'react';
import factory from '../ethereum/factory';
import importMDB from '../ui-components/importMDB';
import Card from '../ui-components/card';

class CampaignShowcase extends Component {
  static async getInitialProps() {
    //runs only once, during the next's server side rendering
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const campaignCards = this.props.campaigns.map(address => {
      return <Card title={address} key={address} />;
    });

    return campaignCards;
  }

  render() {
    return (
      <div>
        {importMDB()}
        {this.renderCampaigns()}
      </div>
    );
  }
}

export default CampaignShowcase;

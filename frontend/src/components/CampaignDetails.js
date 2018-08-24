import React, { Component } from 'react';
import Campaign from '../ethereum/campaign';

class CampaignDetails extends Component {
  async componentDidMount() {
    const campaign = Campaign(this.props.match.params.id);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
  }

  render() {
    return (
      <div className="container animated fadeIn">
        <h1>{this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default CampaignDetails;

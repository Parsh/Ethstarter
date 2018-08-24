import React, { Component } from 'react';
import { ShowCard, Jumbotron } from './ui-components/mdb-stateless-components';
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
      <div className="animated fadeIn">
        <Jumbotron
          title="Ethstarter: Bringing creative projects to life!"
          buttonText="Start a Campaign"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa risus, tristique ac rutrum at, aliquam id purus. Praesent eleifend lectus vel enim euismod, quis porttitor tortor placerat. Sed pretium purus eu lobortis luctus. Aenean quis laoreet urna. Quisque vel consequat erat, ut laoreet sem. "
        />
        <div className="container mt-5 mb-5">
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
      </div>
    );
  }
}

export default CampaignShowcase;

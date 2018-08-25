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
      <div className="animated fadeIn">
        <Jumbotron
          title="Ethstarter: Bringing creative projects to life!"
          buttonText="Start a Campaign"
        >
          Ethstarter is a place where independent creators and passionate
          backers come together to bring new ideas to life.
          <br /> Explore creative projects and campaigns in science, design,
          games, social cause etc. and back your favorites by contributing
          ethers. As you back a project you explicitly get to play a part in
          approving fund transfers. #GreaterControl&Transparency
        </Jumbotron>
        <div className="container mt-5 mb-5">
          <div className="clearfix">
            <Link to="/create-campaign">
              <button type="button" className="btn btn-primary float-right">
                Create Campaign
              </button>
            </Link>
          </div>
          <h1 className="mt-2">Open Campaigns</h1>
          <div className="mt-4">{this.state.renderCampaigns}</div>
        </div>
      </div>
    );
  }
}

export default CampaignShowcase;

import React, { Component } from 'react';
import { ShowCard } from './ui-components/mdb-stateless-components';
import { Link } from 'react-router-dom';

import factory from '../ethereum/factory';

class CampaignShowcase extends Component {
  state = {
    renderCampaigns: null,
    firefoxCORSError: false
  };

  async componentDidMount() {
    try {
      const campaigns = await factory.methods.getDeployedCampaigns().call();

      const campaignCards = campaigns.map(address => {
        return <ShowCard address={address} key={address} route={address} />;
      });

      this.setState({ renderCampaigns: campaignCards });
    } catch (err) {
      if ('Invalid JSON RPC response: ""' === err.message) {
        this.setState({ firefoxCORSError: true });
      }
    }
  }

  render() {
    let corsError = this.state.firefoxCORSError ? (
      <div
        className="alert alert-danger z-depth-2 text-center animated fadeIn"
        role="alert"
        style={{ fontSize: '25px', marginTop: '75px' }}
      >
        {' '}
        <div className="mt-3 mb-3">
          Cross-Origin Request Blocked <strong>@Firefox</strong>.<br />
          We strongly recommend you to use browsers like Chrome, Brave or any
          other Wallet-enabled browser in order to interact with Ethstarter.
        </div>
      </div>
    ) : null;

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
        {corsError}
      </div>
    );
  }
}

export default CampaignShowcase;

import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/campaign';
import { CampaignTron } from '../ui-components/mdb-stateless-components';

class CampaignHome extends Component {
  state = {
    manager: ''
  };

  getManager = async () => {
    this.campaign = Campaign(this.props.match.params.id);
    const manager = await this.campaign.methods.manager().call();
    this.setState({ manager });
  };

  render() {
    this.getManager();
    return (
      <div>
        <CampaignTron
          manager={this.state.manager}
          contractAddress={this.props.match.params.id}
        />
        <div className="container">Something</div>
      </div>
    );
  }
}

export default CampaignHome;

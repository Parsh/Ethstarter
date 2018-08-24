import React, { Component } from 'react';
import Campaign from '../../ethereum/campaign';
import { CampaignTron } from '../ui-components/mdb-stateless-components';
import { Route, Switch } from 'react-router-dom';

import CampaignDetails from './CampaignDetails';
import CampaignRequests from './CampaignRequests';

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
      <div className="animated fadeIn">
        <CampaignTron
          manager={this.state.manager}
          contractAddress={this.props.match.params.id}
        />
        <div className="container">
          <Switch>
            <Route
              path={this.props.match.url + '/requests'}
              render={() => <CampaignRequests {...this.props} />}
            />
            <Route render={() => <CampaignDetails {...this.props} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default CampaignHome;

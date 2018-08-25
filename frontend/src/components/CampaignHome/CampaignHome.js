import React, { Component } from 'react';
import Campaign from '../../ethereum/campaign';
import { CampaignTron } from '../ui-components/mdb-stateless-components';
import { Route, Switch } from 'react-router-dom';

import CampaignDetails from './CampaignDetails';
import CampaignRequests from './CampaignRequests';
import CampaignCreateRequest from './CampaignCreateRequest';

class CampaignHome extends Component {
  state = {
    manager: '',
    campaignName: ''
  };

  async componentDidMount() {
    this.campaign = Campaign(this.props.match.params.id);
    const manager = await this.campaign.methods.manager().call();
    const campaignName = await this.campaign.methods.campaignName().call();
    this.setState({ manager, campaignName });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <CampaignTron
          campaignName={this.state.campaignName}
          manager={this.state.manager}
          contractAddress={this.props.match.params.id}
        />
        <div className="container">
          <Switch>
            <Route
              path={this.props.match.url + '/requests'}
              render={() => <CampaignRequests {...this.props} />}
            />
            <Route
              path={this.props.match.url + '/create-request'}
              render={() => (
                <CampaignCreateRequest
                  contractAddress={this.props.match.params.id}
                />
              )}
            />
            <Route
              path={this.props.match.url}
              render={() => <CampaignDetails {...this.props} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default CampaignHome;

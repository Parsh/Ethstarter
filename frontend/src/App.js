import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import factory from './ethereum/factory';
import { Jumbotron } from './components/ui-components/mdb-stateless-components';
import CampaignShowcase from './components/CampaignShowcase';
import CreateCampaign from './components/CreateCampaign';
import CampaignDetails from './components/CampaignDetails';

class App extends Component {
  state = {
    campaigns: []
  };

  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    this.setState({ campaigns });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Jumbotron
            title="Ethstarter: Bringing creative projects to life!"
            buttonText="Start a Campaign"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa risus, tristique ac rutrum at, aliquam id purus. Praesent eleifend lectus vel enim euismod, quis porttitor tortor placerat. Sed pretium purus eu lobortis luctus. Aenean quis laoreet urna. Quisque vel consequat erat, ut laoreet sem. "
          />

          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <CampaignShowcase campaigns={this.state.campaigns} />
              )}
            />
            <Route path="/create" exact component={CreateCampaign} />
            <Route path="/campaigns/:id" component={CampaignDetails} />
            <Route
              render={() => (
                <CampaignShowcase campaigns={this.state.campaigns} />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

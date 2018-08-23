import React, { Component } from 'react';
import './App.css';
import factory from './ethereum/factory';
import CampaignShowcase from './components/CampaignShowcase';

class App extends Component {
  state = {
    campaigns: []
  };

  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    this.setState({ campaigns });
  }

  render() {
    return <CampaignShowcase campaigns={this.state.campaigns} />;
  }
}

export default App;

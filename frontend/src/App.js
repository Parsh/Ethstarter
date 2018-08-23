import React, { Component } from 'react';
import './App.css';
import factory from './ethereum/factory';

class App extends Component {
  state = {
    campaigns: []
  };

  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    this.setState({ campaigns });
  }

  render() {
    return <h1>{this.state.campaigns}</h1>;
  }
}

export default App;

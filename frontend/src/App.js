import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import CampaignShowcase from './components/CampaignShowcase';
import CreateCampaign from './components/CreateCampaign';
import CampaignHome from './components/CampaignHome/CampaignHome';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={CampaignShowcase}
            //Using the render property and inline function we can pass props to a component
            // render={() => ( <CampaignShowcase campaigns={this.state.campaigns} />)}
          />
          <Route path="/create-campaign" exact component={CreateCampaign} />
          <Route path="/campaigns/:id" component={CampaignHome} />
          <Route component={CampaignShowcase} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

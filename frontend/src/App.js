import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import CampaignHome from './components/CampaignHome/CampaignHome';
import Landing from './components/Landing';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={Landing}
            //Using the render property and inline function we can pass props to a component
            // render={() => ( <CampaignShowcase campaigns={this.state.campaigns} />)}
          />
          <Route path="/campaigns/:id" component={CampaignHome} />
          <Route component={Landing} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

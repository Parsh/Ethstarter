import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateCampaign from './CreateCampaign';
import CampaignShowcase from './CampaignShowcase';
import { Jumbotron } from './ui-components/mdb-stateless-components';

class Landing extends Component {
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
          ethers. As you back a project, you explicitly get to play a part in
          approving fund transfers. #GreaterControl&Transparency
        </Jumbotron>
        <Switch>
          <Route path="/create-campaign" exact component={CreateCampaign} />
          <Route path="/" exact component={CampaignShowcase} />
        </Switch>
      </div>
    );
  }
}

export default Landing;

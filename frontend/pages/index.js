import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignShowcase extends Component {
  static async getInitialProps() {
    //runs only once, during the next's server side rendering
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  getMDB() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.9/css/mdb.min.css"
          rel="stylesheet"
        />
      </div>
    );
  }

  renderCampaigns() {
    const campaignCards = this.props.campaigns.map(address => {
      return (
        <div>
          <div className="card mt-5 hoverable">
            <div className="card-body">
              <h4 className="card-title">
                <a>{address}</a>
              </h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                View Campaign
              </a>
            </div>
          </div>
        </div>
      );
    });

    return <div>{campaignCards}</div>;
  }

  render() {
    return (
      <div>
        {this.getMDB()}
        {this.renderCampaigns()}
      </div>
    );
  }
}

export default CampaignShowcase;

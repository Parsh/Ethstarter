import React, { Component } from 'react';
import Campaign from '../ethereum/campaign';
import {
  DetailCard,
  CampaignTron
} from './ui-components/mdb-stateless-components';

class CampaignDetails extends Component {
  state = {
    summary: null
  };

  async componentDidMount() {
    const campaign = Campaign(this.props.match.params.id);
    let summary = await campaign.methods.getSummary().call();
    //though the above summary var looks like an array, however, it's an object with keys beint 0,1...

    summary = {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      backersCount: summary[3],
      manager: summary[4]
    };

    this.setState({ summary: summary });
  }

  renderDetails() {
    const items = [
      {
        title: this.state.summary.minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'One must contribute atleast this much wei to this campaign in order to become a backer'
      },
      {
        title: this.state.summary.backersCount,
        meta: 'Number of Backers',
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        title: this.state.summary.requestCount,
        meta: 'Number of Requests',
        description:
          "A request tries to withdraw money from campaign's smart contract. Finalizing a request requires approval from backers"
      },
      {
        title: this.state.summary.balance,
        meta: 'Campaign balance (ether)',
        description: 'Reflects the amount of money this campaign have'
      }
    ];

    return items.map(item => {
      return (
        <DetailCard
          title={item.title}
          meta={item.meta}
          description={item.description}
        />
      );
    });
  }

  render() {
    const form = (
      <form onSubmit={this.onSubmit}>
        <div className="md-form">
          <h4>Contribute to the Campaign</h4>
          <input
            type="text"
            // placeholder="Amount in denominations of wei(check minimum)"
            id="form1"
            className="form-control form-control-lg mt-4 w-25 m-auto text-center"
            placeholder="Amount in wei"
            value={this.state.minimumContribution}
            onChange={event =>
              this.setState({ minimumContribution: event.target.value })
            }
          />
          {this.state.loading ? (
            <div>
              <button
                type="submit"
                className="btn btn-lg btn-primary mt-4"
                disabled
              >
                <i className="fa fa-refresh fa-spin mr-3"> </i>
                Contributing...
              </button>
            </div>
          ) : (
            <button type="submit" className="btn btn-lg btn-primary mt-4">
              Contribute !
            </button>
          )}
        </div>
      </form>
    );

    if (this.state.summary) {
      return (
        <div className="animated fadeIn mb-5">
          <CampaignTron manager={this.state.summary.manager} />
          <div className="container">
            <div className="text-center">{form}</div>

            <div className="row mt-5">{this.renderDetails()}</div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default CampaignDetails;

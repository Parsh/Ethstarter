import React, { Component } from 'react';
import Campaign from '../ethereum/campaign';
import { DetailCard } from './ui-components/mdb-stateless-components';

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
        title: this.state.summary.manager,
        meta: 'Address of the Manager',
        description:
          'Manager created this campaign and has the ability to create requests to withdraw money'
      },
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
    if (this.state.summary) {
      return (
        <div className="container animated fadeIn">
          <h1>{this.props.match.params.id}</h1>
          <h1>Manager: {this.state.summary.manager}</h1>
          <div className="mt-5">{this.renderDetails()}</div>
        </div>
      );
    } else {
      return <div className="container">Loading...</div>;
    }
  }
}

export default CampaignDetails;

import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/campaign';
import { Link } from 'react-router-dom';
import { DetailCard } from '../ui-components/mdb-stateless-components';

class CampaignDetails extends Component {
  state = {
    summary: null,
    value: '',
    loading: false,
    errorMessage: '',
    contributed: false
  };

  campaign;

  async componentDidMount() {
    this.campaign = Campaign(this.props.match.params.id);
    let summary = await this.campaign.methods.getSummary().call();
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
        title: web3.utils.fromWei(this.state.summary.balance, 'ether'),
        meta: 'Campaign balance (ether)',
        description:
          'Reflects the amount of money this campaign has left to spend'
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
      }
    ];

    return items.map(item => {
      return (
        <DetailCard
          title={item.title}
          meta={item.meta}
          description={item.description}
          key={item.meta}
        />
      );
    });
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({
      errorMessage: '',
      contributed: false,
      loading: true
    });

    try {
      const accounts = await web3.eth.getAccounts();
      await this.campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      this.setState({ contributed: true, loading: false });
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
  };

  render() {
    let errorAlert = null;
    let successAlert = null;

    if (this.state.errorMessage) {
      errorAlert = (
        <div
          className="alert alert-danger mt-4 z-depth-2 text-center"
          role="alert"
        >
          <strong>Error:</strong> {this.state.errorMessage}
        </div>
      );
    }

    if (this.state.contributed) {
      successAlert = (
        <div
          className="alert alert-success mt-4 z-depth-2 clearfix text-center"
          style={{ fontSize: '20px' }}
          role="alert"
        >
          Yay! You successfully contributed to the campaign. <br />
          <strong style={{ fontSize: '25px' }}>You are now a backer</strong>
          with the ability to participate in request approvals.
        </div>
      );
    }

    const form = (
      <form onSubmit={this.onSubmit}>
        <div className="md-form">
          <h4>Contribute to the Campaign</h4>
          <input
            type="text"
            id="form1"
            className="form-control form-control-lg mt-4 w-25 m-auto text-center"
            placeholder="Amount in ether"
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
          {this.state.loading ? (
            <div>
              <button className="btn btn-lg btn-primary mt-4" disabled>
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

    const breadcrum = (
      <nav className="breadcrumb bg-white">
        <Link to="/" className="breadcrumb-item">
          Ethstarter
        </Link>

        <span className="breadcrumb-item active">Campaign Details</span>
      </nav>
    );

    if (this.state.summary) {
      return (
        <div className="container animated fadeIn mb-5">
          {breadcrum}
          <div className="text-center">{form}</div>
          {errorAlert}
          {successAlert}
          <div className="row">{this.renderDetails()}</div>
          <div className="text-center mt-5">
            <Link to={`${this.props.match.url}/requests`}>
              <button className="btn btn-lg btn-info w-50">
                View Requests
              </button>
            </Link>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default CampaignDetails;

import React, { Component } from 'react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import { Link } from 'react-router-dom';
import { Jumbotron } from './ui-components/mdb-stateless-components';

class CreateCampaign extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    created: false,
    campaign_address: ''
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      errorMessage: '',
      created: false,
      campaign_address: '',
      loading: true
    });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });

      const campaign_address = await factory.methods.recentCampaign().call();
      this.setState({
        created: true,
        campaign_address
      });
    } catch (err) {
      if (
        err.message ===
        'No "from" address specified in neither the given options, nor the default options.'
      ) {
        err.message =
          'Metamask (operating over Rinkeby n/w) is required to create campaign! Please check if you are signed into metamask.';
      }
      this.setState({ errorMessage: err.message });
    }

    this.setState({
      loading: false
    });

    //this.props.history.push('/');
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
          <strong>Error: </strong>
          {this.state.errorMessage}
        </div>
      );
    }

    if (this.state.created) {
      successAlert = (
        <div
          className="alert alert-success mt-4 z-depth-2 clearfix mb-5 text-center"
          style={{ fontSize: '20px' }}
          role="alert"
        >
          Cheers! Your campaign is successfully created and campaign's smart
          contract is deployed on the Ethereum blockchain. <br />
          Here you go:
          <strong className="ml-2" style={{ fontSize: '24px' }}>
            {this.state.campaign_address}
          </strong>
          <Link to={'campaigns/' + this.state.campaign_address}>
            <button type="button" className="btn btn-success float-right mt-3">
              View Campaign
            </button>
          </Link>
        </div>
      );
    }

    const breadcrum = (
      <nav className="breadcrumb bg-white">
        <Link to="/" className="breadcrumb-item">
          Ethstarter
        </Link>

        <span className="breadcrumb-item active">Create Campaign</span>
      </nav>
    );

    return (
      <div className="animated fadeIn">
        <Jumbotron
          title="Ethstarter: Bringing creative projects to life!"
          buttonText="Start a Campaign"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa risus, tristique ac rutrum at, aliquam id purus. Praesent eleifend lectus vel enim euismod, quis porttitor tortor placerat. Sed pretium purus eu lobortis luctus. Aenean quis laoreet urna. Quisque vel consequat erat, ut laoreet sem. "
        />

        <div className="container mt-5">
          {breadcrum}

          <h1 className="mt-5">Create Campaign</h1>

          <form onSubmit={this.onSubmit}>
            <div className="md-form mt-5">
              <h4>Minimum Contribution</h4>
              <h6>
                Amount that an individual has to contribute in order to be a
                backer
              </h6>
              <input
                type="text"
                placeholder="Enter the amount in denominations of wei"
                id="form1"
                className="form-control form-control-lg mt-4"
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
                    Creating...
                  </button>{' '}
                  <span style={{ fontSize: '20px' }} className="ml-3">
                    Hold on! We are deploying your campaign's smart contract on
                    the Ethereum blockchain...
                  </span>
                </div>
              ) : (
                <button type="submit" className="btn btn-lg btn-primary mt-4">
                  Create !
                </button>
              )}
              {errorAlert} {successAlert}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCampaign;

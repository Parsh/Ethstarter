import React, { Component } from 'react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from 'react-router-dom';

class CampaignCreateRequest extends Component {
  state = {
    description: '',
    value: '',
    recipientAddress: '',
    errorMessage: '',
    loading: false,
    created: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({
      errorMessage: '',
      created: false,
      loading: true
    });

    const campaign = Campaign(this.props.contractAddress);
    const { description, value, recipientAddress } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(value, 'ether'),
          recipientAddress
        )
        .send({
          from: accounts[0]
        });

      this.setState({ created: true, loading: false });
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

    if (this.state.created) {
      successAlert = (
        <div
          className="alert alert-success mt-4 z-depth-2 clearfix text-center"
          style={{ fontSize: '20px' }}
          role="alert"
        >
          <strong style={{ fontSize: '22px' }}>
            Request is successfully created!
          </strong>
          <br />
          Please wait for a majority approval(over 50% should approve) from
          backers.
        </div>
      );
    }

    const form = (
      <form onSubmit={this.onSubmit}>
        <div className="md-form text-center">
          <h2>
            Create a Request <span className="text-muted">#Manager-Only </span>
          </h2>
          <div className="md-form mt-5">
            <input
              type="text"
              placeholder="Description"
              className="form-control form-control-lg mt-4 w-50 m-auto "
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </div>
          <div className="md-form">
            <input
              type="text"
              placeholder="Value in ether"
              className="form-control form-control-lg mt-4 w-50 m-auto"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <div className="md-form">
            <input
              type="text"
              placeholder="Recipient's Address"
              className="form-control form-control-lg mt-4 w-50 m-auto"
              value={this.state.recipientAddress}
              onChange={event =>
                this.setState({ recipientAddress: event.target.value })
              }
            />
          </div>
          {this.state.loading ? (
            <div>
              <button className="btn btn-lg btn-primary mt-4 w-25" disabled>
                <i className="fa fa-refresh fa-spin mr-3"> </i>
                Creating...
              </button>
            </div>
          ) : (
            <button type="submit" className="btn btn-lg btn-primary mt-4  w-25">
              Create !
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
        <Link
          to={`/campaigns/${this.props.contractAddress}`}
          className="breadcrumb-item"
        >
          Campaign Details
        </Link>
        <Link
          to={`/campaigns/${this.props.contractAddress}/requests`}
          className="breadcrumb-item"
        >
          Campaign Requests
        </Link>
        <span className="breadcrumb-item active">Create Request</span>
      </nav>
    );

    return (
      <div className="container animated fadeIn mt-5">
        {breadcrum}
        <div style={{ marginTop: '75px' }}>
          {form}
          {errorAlert} {successAlert}
        </div>
      </div>
    );
  }
}

export default CampaignCreateRequest;

import React, { Component } from 'react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import { Link } from 'react-router-dom';

class CreateCampaign extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      errorMessage: '',
      loading: true
    });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    let errorAlert = null;

    if (this.state.errorMessage) {
      errorAlert = (
        <div class="alert alert-danger mt-4 z-depth-2" role="alert">
          {this.state.errorMessage}
        </div>
      );
    }

    return (
      <div className="container animated fadeIn mt-5">
        <div className="clearfix">
          <Link to="/">
            <button type="button" className="btn btn-primary float-right">
              Ethstarter
            </button>
          </Link>
        </div>
        <h1>Create Campaign</h1>

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
              className="form-control mt-4"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />

            {this.state.loading ? (
              <button
                type="submit"
                className="btn btn-lg btn-primary mt-4"
                disabled
              >
                <i class="fa fa-refresh fa-spin mr-3"> </i>
                Creating...
              </button>
            ) : (
              <button type="submit" className="btn btn-lg btn-primary mt-4">
                Create !
              </button>
            )}

            {errorAlert}
          </div>
        </form>
      </div>
    );
  }
}

export default CreateCampaign;

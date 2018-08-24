import React, { Component } from 'react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class CreateCampaign extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    created: false
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

      this.setState({ created: true });
    } catch (err) {
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
        <div className="alert alert-danger mt-4 z-depth-2" role="alert">
          {this.state.errorMessage}
        </div>
      );
    }

    if (this.state.created) {
      successAlert = (
        <div
          className="alert alert-success mt-4 z-depth-2 "
          style={{ fontSize: '20px' }}
          role="alert"
        >
          Cheers! Your campaign is successfully created and campaign's smart
          contract is deployed on the Ethereum blockchain. <br />
          Here you go:
          <strong className="ml-2" style={{ fontSize: '24px' }}>
            0x13fdakjh32jklhj324hk
          </strong>
        </div>
      );
    }

    return (
      <div className="container animated fadeIn mt-5">
        <div className="clearfix">
          {/* <Link to="/"> */}
          <button
            type="button"
            onClick={() => this.props.history.push('/')}
            className="btn btn-primary float-right"
          >
            Ethstarter
          </button>
          {/* </Link> */}
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
              className="form-control form-control-lg mt-4"
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
                <i className="fa fa-refresh fa-spin mr-3"> </i>
                Creating...
              </button>
            ) : (
              <button type="submit" className="btn btn-lg btn-primary mt-4">
                Create !
              </button>
            )}
            {errorAlert} {successAlert}
          </div>
        </form>
      </div>
    );
  }
}

export default CreateCampaign;

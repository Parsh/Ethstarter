import React, { Component } from 'react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class CreateCampaign extends Component {
  state = {
    minimumContribution: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampaing(this.state.minimumContribution).send({
      from: accounts[0]
    });
  };

  render() {
    return (
      <div className="container" style={{ marginTop: '100px' }}>
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
            <button type="submit" className="btn btn-lg btn-primary mt-4">
              Create!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateCampaign;

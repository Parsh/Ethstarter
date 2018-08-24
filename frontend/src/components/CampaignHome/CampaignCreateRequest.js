import React, { Component } from 'react';

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
  };

  render() {
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

    return (
      <div className="container" style={{ marginTop: '100px' }}>
        {form}
      </div>
    );
  }
}

export default CampaignCreateRequest;

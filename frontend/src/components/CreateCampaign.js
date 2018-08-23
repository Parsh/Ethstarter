import React, { Component } from 'react';

class CreateCampaign extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: '100px' }}>
        <h1>Create Campaign</h1>
        <form>
          <div className="md-form mt-5">
            <h4>Minimum Contribution</h4>
            <input
              type="text"
              placeholder="Enter the value in wei"
              id="form1"
              className="form-control"
            />
            <button type="button" class="btn btn-lg btn-primary mt-4">
              Create!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateCampaign;

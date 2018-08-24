import React, { Component } from 'react';

class CampaignDetails extends Component {
  async componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    return (
      <div className="container animated fadeIn">
        <h1>{this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default CampaignDetails;

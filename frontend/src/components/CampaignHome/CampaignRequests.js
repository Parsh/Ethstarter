import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class CampaignRequests extends Component {
  state = {
    requests: [],
    backers: ''
  };

  campaign;

  async componentDidMount() {
    this.campaign = Campaign(this.props.match.params.id);
    const requestsCount = await this.campaign.methods.getRequestsCount().call();
    const backersCount = await this.campaign.methods.backersCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestsCount, 10))
        .fill()
        .map((element, index) => {
          return this.campaign.methods.requests(index).call();
        })
    );
    this.setState({
      requests,
      backers: backersCount
    });
  }

  onApprove = async index => {
    const accounts = await web3.eth.getAccounts();
    await this.campaign.methods.approveRequest(index).send({
      from: accounts[0]
    });
  };

  onFinalize = async index => {
    const accounts = await web3.eth.getAccounts();
    await this.campaign.methods.finalizeRequest(index).send({
      from: accounts[0]
    });
  };

  renderRow = () => {
    return this.state.requests.map((request, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{request.description}</td>
          <td>{web3.utils.fromWei(request.value, 'ether')}</td>
          <td>{request.recipient}</td>
          <td>
            {request.approvalCount}/{this.state.backers}
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => this.onApprove(index)}
            >
              Approve
            </button>
          </td>
          <td>
            <button
              className="btn btn-mdb-color"
              onClick={() => this.onFinalize(index)}
            >
              Finalize
            </button>
          </td>
        </tr>
      );
    });
  };

  renderTable = () => {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Recipient</th>
            <th scope="col">Approval Count</th>
            <th scope="col">#BackerOnly</th>
            <th scope="col">#ManagerOnly</th>
          </tr>
        </thead>
        <tbody>{this.renderRow()}</tbody>
      </table>
    );
  };

  render() {
    return (
      <div className="container animated fadeIn">
        <Link to={this.props.match.url + '/create-request'}>
          <button className="btn btn-info">
            Create Request (Manager Only)
          </button>
        </Link>
        <div>{this.renderTable()}</div>
      </div>
    );
  }
}

export default CampaignRequests;

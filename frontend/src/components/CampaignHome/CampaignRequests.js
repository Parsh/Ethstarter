import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class CampaignRequests extends Component {
  state = {
    requests: [],
    backers: '',
    errorMessage: '',
    approvalLoading: false,
    approved: false,
    finalizeLoading: false,
    finalized: false
  };

  campaign;

  componentDidMount() {
    this.fetchRequests();
  }

  fetchRequests = async () => {
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
  };

  onApprove = async index => {
    this.setState({
      approvalLoading: true,
      errorMessage: '',
      approved: false
    });

    const accounts = await web3.eth.getAccounts();
    try {
      await this.campaign.methods.approveRequest(index).send({
        from: accounts[0]
      });

      setTimeout(() => {
        this.fetchRequests();
        this.setState({
          approved: true,
          approvalLoading: false
        });
      }, 2000);
    } catch (err) {
      if (
        err.message ===
        'No "from" address specified in neither the given options, nor the default options.'
      ) {
        err.message =
          'Metamask (operating over Rinkeby n/w) is required to approve! Please check if you are signed into metamask.';
      }
      this.setState({
        errorMessage: err.message,
        approvalLoading: false
      });
    }
  };

  onFinalize = async index => {
    this.setState({
      finalizeLoading: true,
      errorMessage: '',
      finalized: false
    });

    const accounts = await web3.eth.getAccounts();
    try {
      await this.campaign.methods.finalizeRequest(index).send({
        from: accounts[0]
      });

      setTimeout(() => {
        this.fetchRequests();
        this.setState({
          finalized: true,
          finalizeLoading: false
        });
      }, 2000);
    } catch (err) {
      if (
        err.message ===
        'No "from" address specified in neither the given options, nor the default options.'
      ) {
        err.message =
          'Metamask (operating over Rinkeby n/w) is required to finalize! Please check if you are signed into metamask.';
      }
      this.setState({
        errorMessage: err.message,
        finalizeLoading: false
      });
    }
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
            {request.complete ? null : this.state.approvalLoading ? (
              <button className="btn btn-primary btn-sm disabled">
                <i className="fa fa-refresh fa-spin mr-3"> </i>
                Approving
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.onApprove(index)}
              >
                Approve
              </button>
            )}
          </td>
          <td>
            {request.complete ? (
              <button className="btn btn-mdb-color btn disabled">
                Finalized!
              </button>
            ) : this.state.finalizeLoading ? (
              <button className="btn btn-mdb-color btn-sm disabled">
                <i className="fa fa-refresh fa-spin mr-3"> </i>
                Finalizing
              </button>
            ) : (
              <button
                className="btn btn-mdb-color"
                onClick={() => this.onFinalize(index)}
              >
                Finalize
              </button>
            )}
          </td>
        </tr>
      );
    });
  };

  renderTable = () => {
    return (
      <table className="table table-hover text-center">
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
    let errorAlert = null;
    let approvedAlert = null;
    let finalizedAlert = null;

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

    if (this.state.approved) {
      approvedAlert = (
        <div
          className="alert alert-success mt-4 z-depth-2 clearfix text-center"
          style={{ fontSize: '20px' }}
          role="alert"
        >
          You have successfully approved the request!
        </div>
      );
    }

    if (this.state.finalized) {
      finalizedAlert = (
        <div
          className="alert alert-success mt-4 z-depth-2 clearfix text-center"
          style={{ fontSize: '20px' }}
          role="alert"
        >
          Request is successfully finalized and the payment is transfered to the
          recipient.
        </div>
      );
    }

    const breadcrum = (
      <nav className="breadcrumb bg-white">
        <Link to="/" className="breadcrumb-item">
          Ethstarter
        </Link>
        <Link
          to={`/campaigns/${this.props.match.params.id}`}
          className="breadcrumb-item"
        >
          Campaign Details
        </Link>
        <span className="breadcrumb-item active">Campaign Requests</span>
      </nav>
    );

    return (
      <div className="container animated fadeIn mt-5">
        {breadcrum}
        <div className="clearfix">
          <Link to={this.props.match.url + '/create-request'}>
            <button className="btn btn-info float-right">Create Request</button>
          </Link>
        </div>
        <div className="mt-5">{this.renderTable()}</div>
        <div style={{ marginTop: '75px' }}>
          {errorAlert} {approvedAlert} {finalizedAlert}
        </div>
      </div>
    );
  }
}

export default CampaignRequests;

import React from 'react';

export const Card = props => {
  return (
    <div className="card hoverable">
      <div className="card-body">
        <h4 className="card-title">
          <a>{props.title}</a>
        </h4>
        <p className="card-text">{props.children}</p>
        <a href="#" className="btn btn-info">
          View Campaign
        </a>
      </div>
    </div>
  );
};

export const Jumbotron = props => {
  return (
    <div className="z-depth-4">
      <div
        className="jumbotron jumbotron-fluid"
        style={{
          backgroundImage:
            'url(https://avatars.mds.yandex.net/get-pdb/985790/b812a497-5256-4af1-b79d-9190d692e788/orig)'
        }}
      >
        <div className="container text-center">
          <h1 className="h1-reponsive mb-4 mt-2 text-white font-bold display-4">
            {props.title}
          </h1>
          <p className="lead text-white">{props.content}</p>
          <br />
          <a className="btn btn-outline-white btn-rounded">
            <i className="fa fa-plus left" /> {props.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

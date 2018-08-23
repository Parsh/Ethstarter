import React from 'react';

const Card = props => {
  return (
    <div className="card hoverable">
      <div className="card-body">
        <h4 className="card-title">
          <a>{props.title}</a>
        </h4>
        <p className="card-text">{props.children}</p>
        <a href="#" className="btn btn-primary">
          View Campaign
        </a>
      </div>
    </div>
  );
};

export default Card;

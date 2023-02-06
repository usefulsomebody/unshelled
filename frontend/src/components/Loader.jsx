import React from 'react';

const Loader = () => (
  <div className="circular-loader">
    <div className="has-loader is-relative has-loader-active">
      <div className="h-loader-wrapper">
        <div className="loader is-large is-loading"></div>
      </div>
    </div>
  </div>
);

export default Loader;

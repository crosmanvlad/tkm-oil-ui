import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="tkm-oil-loading">
      <svg className="loading-svg" viewBox="0 0 50 50">
        <circle className="loading-circle is-first" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        <circle className="loading-circle is-second" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        <circle className="loading-circle is-third" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </div>
  );
};

export default Loading;

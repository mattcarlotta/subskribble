import React from 'react';
import { browserHistory } from 'react-router';
import { notfoundContainer } from './404.scss';

export default () => {
  const handleGoBack = () => browserHistory.goBack();

  return (
    <div className={notfoundContainer}>
      <h1>404 - Not Found!</h1>
      <button type="button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

import React, { PureComponent } from 'react';
import { browserHistory } from 'react-router';
import { btnPrimary, notfoundContainer } from './404.scss';

export default class NotFound extends PureComponent {
  handleGoBack = () => browserHistory.goBack();

  render = () => (
    <div className={notfoundContainer}>
      <h1>404 - Page Not Found!</h1>
      <button className={btnPrimary} type="button" onClick={this.handleGoBack}>
        Go Back
      </button>
    </div>
  );
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { pageContainer } from './pageContainer.scss';

export default class PageContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render = () => <div className={pageContainer}>{this.props.children}</div>;
}

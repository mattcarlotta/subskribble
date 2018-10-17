import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { pageContainer } from './pageContainer.scss';

export default class PageContainer extends PureComponent {
  render = () => <div className={pageContainer}>{this.props.children}</div>;
}

PageContainer.propTypes = {
  children: PropTypes.node,
};

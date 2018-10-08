import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class PageContainer extends PureComponent {
  render = () => <div className="page-container">{this.props.children}</div>;
}

PageContainer.propTypes = {
  children: PropTypes.node,
};

import React, { PureComponent } from 'react';

export default class PageContainer extends PureComponent {
  render = () => (
    <div className="page-container">
      {this.props.children}
    </div>
  )
}

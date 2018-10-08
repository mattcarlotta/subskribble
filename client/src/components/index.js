import React, { Fragment } from 'react';
import RenderMessages from '../containers/app/messages/renderMessages';

export default ({ children }) => (
  <Fragment>
    {children}
    <RenderMessages />
  </Fragment>
);

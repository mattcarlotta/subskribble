import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RenderMessages from '../containers/app/messages/renderMessages.js';

const App = ({ children }) => (
  <Fragment>
    {children}
    <RenderMessages />
  </Fragment>
);

export default App;

App.propTypes = {
  children: PropTypes.node.isRequired,
};

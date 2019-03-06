import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RenderMessages from '../containers/app/messages/renderMessages.js';

const App = ({ children }) => (
  <Fragment>
    {children}
    <RenderMessages />
  </Fragment>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;

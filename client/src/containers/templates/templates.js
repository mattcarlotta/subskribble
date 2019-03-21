import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/templateActions.js';
import CARDS from 'components/templates/layouts/PanelCards/panelCards.js';
import PanelLoader from 'components/app/panels/PanelLoader/PanelLoader.js';

const Templates = props => (
  <PanelLoader
    buttonIcon="library_add"
    buttonPushLocation="templates/create"
    cardTitle="Templates"
    CARDS={CARDS}
    panelType="tab"
    tipTitle="Create New Template"
    {...props}
  />
);

export default connect(
  state => ({
    serverError: state.server.error,
    serverMessage: state.server.message,
    ...state.templates,
  }),
  { ...actions },
)(Templates);

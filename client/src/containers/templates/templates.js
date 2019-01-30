import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/templateActions';
import CARDS from '../../components/templates/layouts/PanelCards/panelCards';
import BasicPanelLoader from '../../components/app/panels/BasicPanelLoader/BasicPanelLoader.js';

const Templates = props => (
  <BasicPanelLoader
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

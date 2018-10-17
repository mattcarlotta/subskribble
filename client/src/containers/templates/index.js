import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/templateActions';
import CARDS from '../../components/templates/layouts/panelCards';
import PanelLoader from '../../components/app/panels/PanelLoader/PanelLoader';
import TemplatePanel from '../../components/templates/panels/templatePanels';

const Templates = props => (
  <PanelLoader
    {...props}
    buttonIcon="library_add"
    buttonPushLocation="templates/create"
    cardTitle="Templates"
    CARDS={CARDS}
    Panel={TemplatePanel}
    tipTitle="Create New Template"
  />
);

export default connect(
  state => ({ serverMessage: state.server.message, ...state.templates }),
  { ...actions },
)(Templates);

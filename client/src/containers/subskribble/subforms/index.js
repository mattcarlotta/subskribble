import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/subformsActions';
import CARDS from '../../../components/subskribble/subforms/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import FormsPanel from '../../../components/subskribble/subforms/panels/formsPanels';

const Subscribers = props => (
  <PanelLoader
    {...props}
    buttonIcon="library_add"
    buttonPushLocation="forms/create"
    cardTitle="Forms"
    CARDS={CARDS}
    Panel={FormsPanel}
    tipTitle="Create New Form"
  />
);

export default connect(state => ({ serverMessage: state.server.message, ...state.subs }), { ...actions })(Subscribers)

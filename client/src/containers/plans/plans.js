import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/planActions';
import CARDS from '../../components/plans/layouts/PanelCards/panelCards';
import PanelLoader from '../../components/app/panels/PanelLoader/PanelLoader.js';

const Plans = props => (
  <PanelLoader
    buttonIcon="note_add"
    buttonPushLocation="plans/create"
    cardTitle="Plans"
    CARDS={CARDS}
    panelType="tab"
    tipTitle="Add Plan"
    {...props}
  />
);

export default connect(
  state => ({
    serverError: state.server.error,
    serverMessage: state.server.message,
    ...state.plans,
  }),
  { ...actions },
)(Plans);

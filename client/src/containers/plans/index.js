import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/planActions';
import CARDS from '../../components/plans/layouts/panelCards';
import PanelLoader from '../../components/app/panels/PanelLoader';
import PlansPanel from '../../components/plans/panels/plansPanel';

const Plans = props => (
  <PanelLoader
    buttonIcon="note_add"
    buttonPushLocation="plans/create"
    cardTitle="Plans"
    CARDS={CARDS}
    Panel={PlansPanel}
    {...props}
  />
);

export default connect(
  state => ({ serverMessage: state.server.message, ...state.plans }),
  { ...actions },
)(Plans);

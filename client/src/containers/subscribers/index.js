import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/subscriberActions';
import CARDS from '../../components/subscribers/layouts/PanelCards/panelCards';
import PanelLoader from '../../components/app/panels/PanelLoader/PanelLoader';
import SubsPanel from '../../components/subscribers/panels/subscriptionsPanels';

const Subscribers = props => (
  <PanelLoader
    {...props}
    buttonIcon="person_add"
    buttonPushLocation="subscribers/register"
    cardTitle="Subscribers"
    CARDS={CARDS}
    Panel={SubsPanel}
  />
);

export default connect(
  state => ({ serverMessage: state.server.message, ...state.subs }),
  { ...actions },
)(Subscribers);

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/subscriberActions';
import CARDS from '../../components/subscribers/layouts/PanelCards/panelCards';
import BasicPanelLoader from '../../components/app/panels/BasicPanelLoader/BasicPanelLoader.js';

const Subscribers = props => (
  <BasicPanelLoader
    buttonIcon="person_add"
    buttonPushLocation="subscribers/register"
    cardTitle="Subscribers"
    CARDS={CARDS}
    panelType="tab"
    tipTitle="Add Subscriber"
    {...props}
  />
);

export default connect(
  state => ({
    serverError: state.server.error,
    serverMessage: state.server.message,
    ...state.subs,
  }),
  { ...actions },
)(Subscribers);

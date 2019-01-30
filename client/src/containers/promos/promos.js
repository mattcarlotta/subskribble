import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/promoActions';
import CARDS from '../../components/promos/layouts/PanelCards/panelCards';
import PanelLoader from '../../components/app/panels/PanelLoader/PanelLoader.js';

const Promotionals = props => (
  <PanelLoader
    buttonIcon="playlist_add"
    buttonPushLocation="promotionals/create"
    cardTitle="Promotionals"
    CARDS={CARDS}
    panelType="tab"
    tipTitle="Create New Promotional"
    {...props}
  />
);

export default connect(
  state => ({
    serverError: state.server.error,
    serverMessage: state.server.message,
    ...state.promos,
  }),
  { ...actions },
)(Promotionals);

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/promoActions';
import CARDS from '../../components/promos/layouts/panelCards';
import PanelLoader from '../../components/app/panels/PanelLoader/PanelLoader';
import PromosPanel from '../../components/promos/panels/promosPanels';

const Promotionals = props => (
  <PanelLoader
    {...props}
    buttonIcon="playlist_add"
    buttonPushLocation="promotionals/create"
    cardTitle="Promotionals"
    CARDS={CARDS}
    Panel={PromosPanel}
  />
);

export default connect(
  state => ({ serverMessage: state.server.message, ...state.promos }),
  { ...actions },
)(Promotionals);

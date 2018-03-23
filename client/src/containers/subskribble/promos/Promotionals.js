import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/promoActions';
import CARDS from '../../../components/subskribble/promos/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import PromosPanel from '../../../components/subskribble/promos/panels/promosPanels';

const Promotionals = props => (
  <PanelLoader
    CARDS={CARDS}
    Panel={PromosPanel}
    {...props}
  />
)

export default connect(state => ({ ...state.promos }), { ...actions })(Promotionals)

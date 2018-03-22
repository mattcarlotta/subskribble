import React from 'react';
import { connect } from 'react-redux';
import { deleteAction, fetchAction, fetchItems, fetchItemCounts, updateAction } from '../../../actions/promoActions';
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

export default connect(state => ({
  activeitems: state.promos.activeitems,
  activeitemcount: state.promos.activeitemcount,
  inactiveitems: state.promos.inactiveitems,
  inactiveitemcount: state.promos.inactiveitemcount
}), {
  deleteAction,
  fetchAction,
  fetchItems,
  fetchItemCounts,
  updateAction
})(Promotionals)

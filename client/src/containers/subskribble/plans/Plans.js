import React from 'react';
import { connect } from 'react-redux';
import { deleteAction, fetchAction, fetchItems, fetchItemCounts, updateAction } from '../../../actions/planActions';
import CARDS from '../../../components/subskribble/plans/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import PlansPanel from '../../../components/subskribble/plans/panels/plansPanel';

export default connect(state => ({
  activeitems: state.plans.activeitems,
  activeitemcount: state.plans.activeitemcount,
  inactiveitems: state.plans.inactiveitems,
  inactiveitemcount: state.plans.inactiveitemcount
}), {
  deleteAction,
  fetchAction,
  fetchItems,
  fetchItemCounts,
  updateAction
})(props => (
  <PanelLoader
    CARDS={CARDS}
    Panel={PlansPanel}
    {...props}
  />
))

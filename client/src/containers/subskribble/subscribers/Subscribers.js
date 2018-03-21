import React from 'react';
import { connect } from 'react-redux';
import { deleteAction, fetchAction, fetchItems, fetchItemCounts, updateAction } from '../../../actions/subscriberActions';
import CARDS from '../../../components/subskribble/subscribers/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import SubsPanel from '../../../components/subskribble/subscribers/panels/subscriptionsPanels';

const Subscribers = props => (
  <PanelLoader
    CARDS={CARDS}
    Panel={SubsPanel}
    {...props}
  />
)

export default connect(state => ({
  activeitems: state.subs.activeitems,
  activeitemcount: state.subs.activeitemcount,
  inactiveitems: state.subs.inactiveitems,
  inactiveitemcount: state.subs.inactiveitemcount
}), {
  deleteAction,
  fetchAction,
  fetchItems,
  fetchItemCounts,
  updateAction
})(Subscribers)

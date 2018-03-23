import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/subscriberActions';
import CARDS from '../../../components/subskribble/subscribers/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import SubsPanel from '../../../components/subskribble/subscribers/panels/subscriptionsPanels';

const Subscribers = props => ( <PanelLoader CARDS={CARDS} Panel={SubsPanel} {...props} /> );

export default connect(state => ({ ...state.subs }), { ...actions })(Subscribers)

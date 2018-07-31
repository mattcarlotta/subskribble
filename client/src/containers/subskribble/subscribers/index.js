import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/subscriberActions';
import CARDS from '../../../components/subskribble/subscribers/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import SubsPanel from '../../../components/subskribble/subscribers/panels/subscriptionsPanels';

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

export default connect(state => ({ serverMessage: state.server.message, ...state.subs }), { ...actions })(Subscribers)

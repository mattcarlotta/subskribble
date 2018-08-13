import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/planActions';
import CARDS from '../../../components/subskribble/plans/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import PlansPanel from '../../../components/subskribble/plans/panels/plansPanel';

const Plans = props => (
	<PanelLoader
		buttonIcon="note_add"
		buttonPushLocation="plans/create"
		cardTitle="Plans"
		CARDS={CARDS}
		Panel={PlansPanel}
		{...props}
	/>
);

export default connect(state => ({ serverMessage: state.server.message, ...state.plans }), { ...actions })(Plans)

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/templateActions';
import CARDS from '../../../components/subskribble/templates/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import TemplatePanel from '../../../components/subskribble/templates/panels/templatePanels';

const Templates = props => (
	<PanelLoader
		{...props}
		buttonIcon="library_add"
		buttonPushLocation="templates/create"
		cardTitle="Templates"
		CARDS={CARDS}
		Panel={TemplatePanel}
		tipTitle="Create New Template"
	/>
);

export default connect(state => ({ serverMessage: state.server.message, ...state.templates }), { ...actions })(Templates)

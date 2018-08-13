import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/promoActions';
import CARDS from '../../../components/subskribble/promos/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import PromosPanel from '../../../components/subskribble/promos/panels/promosPanels';

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

export default connect(state => ({ serverMessage: state.server.message, ...state.promos }), { ...actions })(Promotionals)

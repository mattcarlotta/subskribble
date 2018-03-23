import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/planActions';
import CARDS from '../../../components/subskribble/plans/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import PlansPanel from '../../../components/subskribble/plans/panels/plansPanel';

const Plans = props => ( <PanelLoader CARDS={CARDS} Panel={PlansPanel} {...props} /> );

export default connect(state => ({ ...state.plans }), { ...actions })(Plans)

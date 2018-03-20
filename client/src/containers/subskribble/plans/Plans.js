import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchPlans, fetchPlanCounts } from '../../../actions/planActions';
import CARDS from '../../../components/subskribble/plans/layouts/panelCards';
import PlansPanel from '../../../components/subskribble/plans/panels/plansPanel';
import Loader from '../../../containers/subskribble/app/loading/Loader';

class Plans extends PureComponent {
  componentDidMount = () => {
    const { activeplancount, inactiveplancount, fetchPlans, fetchPlanCounts } = this.props;
    (!activeplancount || !inactiveplancount) && fetchPlanCounts();
    fetchPlans();
  }

  render = () => (
    (!this.props.activeplans || !this.props.inactiveplans || !this.props.activeplancount || !this.props.inactiveplancount)
      ? <Loader buttonLabel="Add Plan" title="Plans" formNum={0} />
      : <PlansPanel CARDS={CARDS({...this.props})} />
  )
}

export default connect(state => ({
  activeplans: state.plans.activeplans,
  activeplancount: state.plans.activeplancount,
  inactiveplans: state.plans.inactiveplans,
  inactiveplancount: state.plans.inactiveplancount
}), {
  fetchPlans,
  fetchPlanCounts
})(Plans)

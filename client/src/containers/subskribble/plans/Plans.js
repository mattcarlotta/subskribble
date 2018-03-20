import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { deletePlan, fetchNextPlans, fetchPlans, fetchPlanCounts, updatePlan } from '../../../actions/planActions';
import CARDS from '../../../components/subskribble/plans/layouts/panelCards';
import PlansPanel from '../../../components/subskribble/plans/panels/plansPanel';
import Loader from '../../../containers/subskribble/app/loading/Loader';

class Plans extends PureComponent {
  state = { isLoading: true };

  componentDidMount = () => {
    const { activeplancount, inactiveplancount, fetchPlans, fetchPlanCounts } = this.props;
    (!activeplancount || !inactiveplancount) && fetchPlanCounts();
    fetchPlans();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { activeplans, activeplancount, inactiveplans, inactiveplancount  } = this.props;
    if ((activeplans && activeplancount) || (inactiveplans && inactiveplancount)) this.setState({ isLoading: false })
  }

  render = () => (
    (this.state.isLoading)
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
  deletePlan,
  fetchNextPlans,
  fetchPlans,
  fetchPlanCounts,
  updatePlan
})(Plans)

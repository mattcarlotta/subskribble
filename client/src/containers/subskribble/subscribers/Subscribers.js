import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { deleteSubscriber, fetchNextSubscribers, fetchSubscribers, fetchSubscriberCounts, updateSubscriber } from '../../../actions/subscriberActions';
import CARDS from '../../../components/subskribble/subscribers/layouts/panelCards';
import SubscriptionsPanel from '../../../components/subskribble/subscribers/panels/subscriptionsPanels';
import Loader from '../../../containers/subskribble/app/loading/Loader';

class Subscribers extends PureComponent {
  state = { isLoading: true };

  componentDidMount = () => {
    const { activesubcount, inactivesubcount, fetchSubscriberCounts, fetchSubscribers } = this.props;
    (!activesubcount || !inactivesubcount) && fetchSubscriberCounts();
    fetchSubscribers();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { activesubs, activesubcount, inactivesubs, inactivesubcount  } = this.props;
    if ((activesubs && activesubcount) || (inactivesubs && inactivesubcount)) this.setState({ isLoading: false })
  }

  render = () => (
    (this.state.isLoading)
      ? <Loader buttonLabel="Add Subscriber" title="Subscribers" formNum={0} />
      : <SubscriptionsPanel CARDS={CARDS({...this.props})} />
  )
}

export default connect(state => ({
  activesubs: state.subs.activesubs,
  activesubcount: state.subs.activesubcount,
  inactivesubs: state.subs.inactivesubs,
  inactivesubcount: state.subs.inactivesubcount
}), {
  deleteSubscriber,
  fetchNextSubscribers,
  fetchSubscribers,
  fetchSubscriberCounts,
  updateSubscriber
})(Subscribers)

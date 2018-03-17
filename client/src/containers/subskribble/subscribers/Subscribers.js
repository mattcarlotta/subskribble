import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchSubscribers, fetchSubscriberCounts } from '../../../actions/tableActions';
import CARDS from '../../../components/subskribble/subscribers/layouts/panelCards';
import SubscriptionsPanel from '../../../components/subskribble/subscribers/panels/subscriptionsPanels';
import Loader from '../../../containers/subskribble/app/loading/Loader';

class Subscribers extends PureComponent {
  componentDidMount = () => {
    const { activesubcount, inactivesubcount, fetchSubscriberCounts, fetchSubscribers } = this.props;
    (!activesubcount || !inactivesubcount) && fetchSubscriberCounts();
    fetchSubscribers();
  }

  render = () => (
    (!this.props.activesubs || !this.props.inactivesubs || !this.props.activesubcount || !this.props.inactivesubcount)
      ? <Loader buttonLabel="Add Subscriber" formNum={0} />
      : <SubscriptionsPanel CARDS={CARDS({...this.props})} />
  )
}

export default connect(state => ({
  activesubs: state.fields.activesubs,
  activesubcount: state.fields.activesubcount,
  inactivesubs: state.fields.inactivesubs,
  inactivesubcount: state.fields.inactivesubcount
}), { fetchSubscribers, fetchSubscriberCounts })(Subscribers)

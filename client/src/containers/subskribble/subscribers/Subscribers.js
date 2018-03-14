import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchSubscribers } from '../../../actions/tableActions';
import CARDS from '../../../components/subskribble/subscribers/layouts/panelCards';
import SubscriptionsPanel from '../../../components/subskribble/subscribers/panels/subscriptionsPanels';
import Loader from '../../../components/subskribble/app/loading/Loader';

class Subscribers extends PureComponent {
  componentDidMount = () => this.props.fetchSubscribers();

  render = () => {
    const { activesubs, activesubcount, inactivesubs, inactivesubcount, serverError } = this.props;

    if (!activesubs || !inactivesubs) {
      return <Loader buttonLabel="Add Subscriber" formNum={0} serverError={serverError} />
    }

    return <SubscriptionsPanel CARDS={CARDS(activesubs, activesubcount, inactivesubs, inactivesubcount)} />;
  }
}

export default connect(state => ({
  activesubs: state.fields.activesubs,
  activesubcount: state.fields.activesubcount,
  inactivesubs: state.fields.inactivesubs,
  inactivesubcount: state.fields.inactivesubcount,
  serverError: state.server.error
}), {fetchSubscribers})(Subscribers)

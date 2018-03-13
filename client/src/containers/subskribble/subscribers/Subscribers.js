import React, { Component } from 'react';

import { fetchSubscribers } from '../../../actions/subscriberActions';
import CARDS from '../../../components/subskribble/subscribers/layouts/panelCards';
import SubscriptionsPanel from '../../../components/subskribble/subscribers/panels/subscriptionsPanels';
import Loader from '../../../components/subskribble/app/loading/Loader';
import NoSubscribers from '../../../components/subskribble/app/notfound/noSubscribers';

export default class Subscribers extends Component {
  state = { activesubscribers: '', inactivesubscribers: '', serverError: '' };

  componentDidMount = () => this.fetchAllSubscribers();

  fetchAllSubscribers = () => (
    fetchSubscribers()
    .then(({data: {activesubscribers, inactivesubscribers}}) => this.setState({ activesubscribers1: activesubscribers , inactivesubscribers1: inactivesubscribers }))
    .catch(err => this.setState({ serverError: err }))
  )

  // componentDidUpdate = (nextProps, nextState) => {
	// 	const currentLoadedPage = parseInt(this.props.location.query.pageId, 10);
	// 	if (this.state.currentPage !== currentLoadedPage) {
	// 		this.setState({ currentPage: currentLoadedPage, isLoading: true }, () => {
	// 			this.fetchBlogPosts(this.state.currentPage - 1);
	// 		});
	// 	}
	// }


  render = () => {
    const { activesubscribers, inactivesubscribers, serverError } = this.state;

    if (!activesubscribers || !inactivesubscribers) {
      return <Loader Component={NoSubscribers} serverError={serverError} />
    }

    return <SubscriptionsPanel CARDS={CARDS(activesubscribers, inactivesubscribers)} />;
  }
}

import React, { Component } from 'react';

import { fetchSubscribers } from '../../../actions/subscriberActions';
import CARDS from '../../../components/subskribble/subscribers/layouts/panelCards';
import SubscriptionsPanel from '../../../components/subskribble/subscribers/panels/subscriptionsPanels';
import Spinner from '../../../components/app/loading/spinner';

export default class Subscribers extends Component {
  state = { activesubscribers: '', inactivesubscribers: '', serverError: '' };

  componentDidMount = () => this.fetchAllSubscribers();

  fetchAllSubscribers = () => (
    fetchSubscribers()
    .then(({data: {activesubscribers, inactivesubscribers}}) => this.setState({ activesubscribers, inactivesubscribers}))
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
      if (serverError) return <p>Error!</p>
      return <Spinner />
    }

    return <SubscriptionsPanel CARDS={CARDS(activesubscribers, inactivesubscribers)} />;
  }
}

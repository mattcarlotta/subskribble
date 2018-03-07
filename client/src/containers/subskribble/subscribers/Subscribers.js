import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSubscribers } from '../../../actions/subscriberActionCreators';
import CARDS from '../../../components/subskribble/subscribers/layouts/panelCards';
import SubscriptionsPanel from '../../../components/subskribble/subscribers/panels/subscriptionsPanels';

class Subscribers extends Component {
  state = { subscribers: '', serverError: '' };

  componentDidMount = () => {
    this.fetchAllSubscribers();
  }

  fetchAllSubscribers = () => {
    this.props.fetchSubscribers()
    .then(({data: {subscribers}}) => this.setState({ subscribers }))
    .catch(err => this.setState({ serverError: err }))
  }

  // componentDidUpdate = (nextProps, nextState) => {
	// 	const currentLoadedPage = parseInt(this.props.location.query.pageId, 10);
	// 	if (this.state.currentPage !== currentLoadedPage) {
	// 		this.setState({ currentPage: currentLoadedPage, isLoading: true }, () => {
	// 			this.fetchBlogPosts(this.state.currentPage - 1);
	// 		});
	// 	}
	// }


  render = () => {
    const { subscribers, serverError } = this.state;

    if (!subscribers) return <p>Loading...</p>
    if (serverError) return <p>Error!</p>
    return <SubscriptionsPanel CARDS={CARDS(subscribers)} />;
  }
}

export default connect(null, { fetchSubscribers })(Subscribers);

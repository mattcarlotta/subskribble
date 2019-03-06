import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import PageContainer from '../../app/panels/PageContainer/pageContainer.js';
import MessagesPanel from '../MessagesPanel/messagesPanel.js';
import PlansPanel from '../PlansPanel/plansPanel.js';
import PromotionalsPanel from '../PromotionalsPanel/promotionalsPanel.js';
import SubcribersPanel from '../SubscribersPanel/subscribersPanel.js';
import TemplatesPanel from '../TemplatesPanel/templatesPanel.js';
import TransactionsPanel from '../TransactionsPanel/transactionsPanel.js';

class DashboardPanels extends Component {
  state = {
    isLoading: true,
    subscribers: '',
    inactivesubscribers: '',
    plans: '',
    popularplans: [],
    popularpromotionals: [],
    promotionals: '',
    credits: '',
    creditstotal: '',
    dues: '',
    duestotal: '',
    charges: '',
    chargestotal: '',
    refunds: '',
    refundstotal: '',
    messages: '',
    activetemplates: '',
    inactivetemplates: '',
  };

  componentDidMount = () => this.fetchData();

  fetchData = () => {
    this.props
      .getDashboardData()
      .then(({ data }) => {
        this.setState({ ...data, isLoading: false });
      })
      .catch(() =>
        this.setState({
          isLoading: false,
        }),
      );
  };

  render = () =>
    this.state.isLoading ? null : (
      <PageContainer>
        <Row style={{ marginTop: 30 }}>
          <SubcribersPanel {...this.state} />
          <PlansPanel {...this.state} />
          <PromotionalsPanel {...this.state} />
          <TransactionsPanel {...this.state} />
          <MessagesPanel {...this.state} />
          <TemplatesPanel {...this.state} />
        </Row>
      </PageContainer>
    );
}

DashboardPanels.propTypes = {
  getDashboardData: PropTypes.func.isRequired,
};

export default DashboardPanels;

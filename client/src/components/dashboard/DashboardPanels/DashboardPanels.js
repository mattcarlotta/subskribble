import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import PageContainer from 'components/app/panels/PageContainer/pageContainer.js';
import MessagesPanel from 'components/dashboard/MessagesPanel/messagesPanel.js';
import PlansPanel from 'components/dashboard/PlansPanel/plansPanel.js';
import PromotionalsPanel from 'components/dashboard/PromotionalsPanel/promotionalsPanel.js';
import SubcribersPanel from 'components/dashboard/SubscribersPanel/subscribersPanel.js';
import TemplatesPanel from 'components/dashboard/TemplatesPanel/templatesPanel.js';
import TransactionsPanel from 'components/dashboard/TransactionsPanel/transactionsPanel.js';

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

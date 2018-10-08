import React, { Component } from 'react';
import { Row } from 'antd';

import PageContainer from '../../app/panels/pageContainer';
import MessagesPanel from './messagesPanel';
import PlansPanel from './plansPanel';
import PromotionalsPanel from './promotionalsPanel';
import SubcribersPanel from './subscribersPanel';
import TemplatesPanel from './templatesPanel';
import TransactionsPanel from './transactionsPanel';

export default class Dashboard extends Component {
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

  componentDidMount = () =>
    this.props
      .getDashboardData()
      .then(({ data }) => this.setState({ ...data, isLoading: false }));

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

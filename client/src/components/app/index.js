import each from 'lodash/each';
import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { Layout } from 'antd';
import CustomScrollbars from './scrollbars/CustomScrollbars';
import Header from './navigation/topbar/header';
import InlineMenu from './navigation/sidebar/InlineMenu';
const { Content } = Layout;

const TABS = [
  'dashboard',
  'subscribers',
  'plans',
  'promotionals',
  'transactions',
  'messages',
  'templates',
];

const selectedTab = path => {
  const selected = [];
  each(TABS, tab => {
    if (path.indexOf(tab) >= 1) selected.push(tab);
  });
  return selected;
};

class App extends Component {
  state = { selectedKey: selectedTab(this.props.location.pathname) };

  componentDidUpdate = (prevProps, prevState) => {
    const { location } = this.props;
    location.pathname !== prevProps.location.pathname &&
      this.setState({ selectedKey: selectedTab(location.pathname) });
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    this.props.collapseSideNav !== nextProps.collapseSideNav ||
    this.props.location.pathname !== nextProps.location.pathname ||
    this.state.selectedKey !== nextState.selectedKey;

  handleMenuToggle = () =>
    this.props.saveSidebarState(!this.props.collapseSideNav);

  handleTabClick = ({ key }) =>
    browserHistory.push(`/subskribble/${key ? key : ''}`);

  render = () => (
    <Layout style={{ overflow: 'hidden' }}>
      <InlineMenu
        collapseSideNav={this.props.collapseSideNav}
        handleTabClick={this.handleTabClick}
        selectedKey={this.state.selectedKey}
      />
      <Layout>
        <Header
          collapseSideNav={this.props.collapseSideNav}
          handleMenuToggle={this.handleMenuToggle}
        />
        <Content>
          <CustomScrollbars minHeight={`calc(100vh - 55px)`} top={55}>
            {this.props.children}
          </CustomScrollbars>
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(App);

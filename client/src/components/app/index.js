import each from 'lodash/each';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, withRouter } from 'react-router';
import { Layout } from 'antd';
import CustomScrollbars from './scrollbars/CustomScrollbars.js';
import Header from './navigation/topbar/Header/header.js';
import InlineMenu from './navigation/sidebar/InlineMenu.js';

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

  shouldComponentUpdate = (nextProps, nextState) =>
    this.props.collapseSideNav !== nextProps.collapseSideNav ||
    this.props.location.pathname !== nextProps.location.pathname ||
    this.state.selectedKey !== nextState.selectedKey;

  componentDidUpdate = prevProps => {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname)
      this.setState({ selectedKey: selectedTab(location.pathname) });
  };

  onHandleMenuToggle = () =>
    this.props.saveSidebarState(!this.props.collapseSideNav);

  onHandleTabClick = ({ key }) =>
    browserHistory.push(`/subskribble/${key || ''}`);

  render = () => (
    <Layout style={{ overflow: 'hidden' }}>
      <InlineMenu
        collapseSideNav={this.props.collapseSideNav}
        handleTabClick={this.onHandleTabClick}
        selectedKey={this.state.selectedKey}
      />
      <Layout>
        <Header
          collapseSideNav={this.props.collapseSideNav}
          handleMenuToggle={this.onHandleMenuToggle}
        />
        <Content>
          <CustomScrollbars minHeight="calc(100vh - 55px)" top={55}>
            {this.props.children}
          </CustomScrollbars>
        </Content>
      </Layout>
    </Layout>
  );
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
  collapseSideNav: PropTypes.bool.isRequired,
  saveSidebarState: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default withRouter(App);

import Drawer from 'rc-drawer-menu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../actions/adminActions';
import AdminMenu from './adminMenu';

class SideBar extends Component {
  state = { openSideNav: false }

  shouldComponentUpdate = (nextProps, nextState) => (nextProps.location !== this.props.location || nextState.openSideNav !== this.state.openSideNav)

  handleMenuToggle = () => this.setState({ openSideNav: !this.state.openSideNav });

  handleTabClick = ({key}) => {
    switch (key) {
      case '1': return this.props.createSubscriber();
      // case '2': return this.props.deleteSubscriber();
      // case '3': return this.props.suspendSubsciber();
      // case '4': return this.props.activateSubscriber();
      // case '5': return this.props.deleteAllSubscribers();
      case '6': return this.props.createPlan();
      case '7': return this.props.deletePlan();
      // case '8': return this.props.suspendPlan();
      // case '9': return this.props.activatePlanr();
      // case '10': return this.props.deleteAllPlans();
      // case '11': return this.props.createPromo();
      // case '12': return this.props.deletePromo();
      // case '13': return this.props.suspendPromo();
      // case '14': return this.props.activatePromo();
      // case '15': return this.props.deleteAllPromos();
      // case '16': return this.props.createTransaction();
      // case '17': return this.props.deleteTransaction();
      // case '18': return this.props.suspendTransaction();
      // case '19': return this.props.activateTransaction();
      // case '20': return this.props.deleteAllTransactions();
      default: return console.log('nothing selected');
    }
  }

  render = () => (
    this.props.isAdmin
      ? <Drawer
          handleChild={<i className="material-icons">build</i>}
          open={this.state.openSideNav}
          onMaskClick={this.handleMenuToggle}
          placement="right"
          onHandleClick={this.handleMenuToggle}
        >
          <AdminMenu handleTabClick={this.handleTabClick} />
        </Drawer>
      : null
  );
}

export default connect(state => ({ isAdmin: state.auth.isGod }), { ...actions })(SideBar);

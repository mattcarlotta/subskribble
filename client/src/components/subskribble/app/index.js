import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { Layout } from 'antd';
import CustomScrollbars from './scrollbars/CustomScrollbars';
import Header from './navigation/topbar/header';
import InlineMenu from './navigation/sidebar/InlineMenu';
import AdminDrawer from '../../../containers/subskribble/app/admin/AdminDrawer';

const { Content } = Layout;

class App extends Component {
	state = { selectedKey: [this.props.location.pathname.replace(/\/subskribble\//g,'')] };

	componentDidUpdate = (prevProps, prevState) => {
		const { location } = this.props;
		location.pathname !== prevProps.location.pathname && this.setState({ selectedKey: [location.pathname.replace(/\/subskribble\//g,'')] })
	}

	shouldComponentUpdate = (nextProps, nextState) => ( this.props.collapseSideNav !== nextProps.collapseSideNav || this.props.location.pathname !== nextProps.location.pathname || this.state.selectedKey !== nextState.selectedKey )

	handleMenuToggle = () => this.props.saveSidebarState(!this.props.collapseSideNav);

	handleTabClick = ({key}) => browserHistory.push(`/subskribble/${key}`)

	render = () => (
		<Layout style={{ overflow: 'hidden' }}>
			<InlineMenu collapseSideNav={this.props.collapseSideNav} handleTabClick={this.handleTabClick} selectedKey={this.state.selectedKey} />
     <Layout>
       <Header collapseSideNav={this.props.collapseSideNav} handleMenuToggle={this.handleMenuToggle} />
       <Content>
				 <CustomScrollbars minHeight={`calc(100vh - 55px)`} top={55}>
         		{ this.props.children }
				</CustomScrollbars>
       </Content>
			 <AdminDrawer />
     </Layout>
   </Layout>
	);
}

export default withRouter(App);

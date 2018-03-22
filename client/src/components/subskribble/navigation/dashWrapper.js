import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { Layout } from 'antd';
import Header from './header';
import InlineMenu from './sidebar/InlineMenu';
const { Content } = Layout;

// import Footer from './footer';

export default WrappedComponent => {
	class DashboardWrapper extends Component {
		state = { collapseSideNav: false, selectedKey: [this.props.location.pathname.replace(/\/subskribble\//g,'')] }

		shouldComponentUpdate = (nextProps, nextState) => ( this.state.collapseSideNav !== nextState.collapseSideNav || this.props.location.pathname !== nextProps.location.pathname )

		handleMenuToggle = () => this.setState({ collapseSideNav: !this.state.collapseSideNav });

		handleTabClick = ({key}) => {
			this.setState({ selectedKey: [key ? key : 'subskribble'] }, () => browserHistory.push(`/subskribble/${key}`))
		}

		render = () => (
			<Layout style={{ overflow: 'hidden' }}>
				<InlineMenu
					handleTabClick={this.handleTabClick}
					collapseSideNav={this.state.collapseSideNav}
					selectedKey={this.state.selectedKey}
				/>
       <Layout>
         <Header
					handleMenuToggle={this.handleMenuToggle}
					collapseSideNav={this.state.collapseSideNav}
				 />
         <Content>
           <WrappedComponent {...this.props} />
         </Content>
       </Layout>
     </Layout>
		);
	}

	return withRouter(DashboardWrapper);
};

import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { Layout } from 'antd';
import Header from './header';
import InlineMenu from './sidebar/InlineMenu';
const { Content } = Layout;

export default WrappedComponent => {
	class DashboardWrapper extends Component {
		state = { collapseSideNav: false }

		componentDidMount = () => this.setSelectedKey()

		componentDidUpdate = (prevProps, prevState) => (this.props.location.pathname !== prevProps.location.pathname) && this.setSelectedKey();

		setSelectedKey = () => this.setState({ selectedKey: [this.props.location.pathname.replace(/\/subskribble\//g,'')] })

		shouldComponentUpdate = (nextProps, nextState) => ( this.state.collapseSideNav !== nextState.collapseSideNav || this.props.location.pathname !== nextProps.location.pathname || this.state.selectedKey !== nextState.selectedKey )

		handleMenuToggle = () => this.setState({ collapseSideNav: !this.state.collapseSideNav });

		handleTabClick = ({key}) => browserHistory.push(`/subskribble/${key}`)

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

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

		componentDidUpdate = (prevProps) => {
			const pathname = this.props.location.pathname.replace(/\/subskribble\//g,'');
			const selectedTab = this.state.selectedKey[0];
			if (this.props.location !== prevProps.location && pathname !== selectedTab) {
				this.setState({ selectedKey: [pathname] })
			}
		}

		handleMenuToggle = () => this.setState({ collapseSideNav: !this.state.collapseSideNav });

		handleTabClick = ({key}) => browserHistory.push(`/subskribble/${key}`)

		render() {
			return (
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
	}

	return withRouter(DashboardWrapper);
};

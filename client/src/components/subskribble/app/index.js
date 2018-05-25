import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../navigation/topbar/header';
import InlineMenu from '../navigation/sidebar/InlineMenu';
import AdminDrawer from '../../../containers/subskribble/app/admin/AdminDrawer';

const { Content } = Layout;

class App extends Component {
	state = { selectedKey: [this.props.location.pathname.replace(/\/subskribble\//g,'')] };

	componentDidUpdate = (prevProps, prevState) => {
		const { location } = this.props;
		location !== prevProps.location && this.refs.scrollbars.scrollTop(0);
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
				 <Scrollbars
				 	ref="scrollbars"
					style={{ width: '100%', top: '55px' }}
					autoHeight
					autoHeightMin={`calc(100vh - 55px)`}
					autoHide
					autoHideTimeout={500}
					autoHideDuration={200}
					renderThumbVertical={props => <div {...props} className="scrollbar"/>}
					>
         		{ this.props.children }
				</Scrollbars>
       </Content>
			 <AdminDrawer />
     </Layout>
   </Layout>
	);
}

export default withRouter(App);

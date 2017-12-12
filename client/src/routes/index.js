// APP VIEW IMPORTS
import App from '../views/app/index';
import ContactUs from '../views/rocketboard/contact';
import Customers from '../views/rocketboard/customers';
import Dashboard from '../views/rocketboard/dashboard';
import DashWrapper from '../components/rocketboard/navigation/dashWrapper';
import FAQs from '../views/rocketboard/faqs';
import Home from '../views/website/home';
import Forms from '../views/rocketboard/forms';
import Invoices from '../views/rocketboard/invoices';
import ForgotPassword from '../views/website/forgotPassword';
import LogIn from '../views/website/login';
import NotFound from '../views/app/404';
import Plans from '../views/rocketboard/plans';
import Pricing from '../views/website/pricing';
import Profile from '../views/rocketboard/profile';
// import OnLoadAuth from '../containers/app/OnLoadAuth';
// import RequireAuth from '../containers/auth/RequireAuth';
import Messages from '../views/rocketboard/messages';
import NavWrapper from '../components/website/navigation/NavWrapper';
import Settings from '../views/rocketboard/settings';
import SignUp from '../views/website/signup';
import Subscriptions from '../views/rocketboard/subscriptions';
import Templates from '../views/rocketboard/templates';
import Transactions from '../views/rocketboard/transactions';
import Tutorials from '../views/rocketboard/tutorials';

// APP CONFIG IMPORTS (REACT, REDUX, MATERIAL-UI)
import React from 'react';
import { browserHistory, IndexRoute, Route, Router, Redirect } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

injectTapEventPlugin();

// CONFIG APP ROUTE VIEWS
const routes = (
	<div>
		<Route path="/" component={NavWrapper(App)}>
			<IndexRoute component={Home} />
			<Route path="forgot-password" component={ForgotPassword} />
			<Route path="login" component={LogIn} />
			<Route path="pricing" component={Pricing} />
			<Route path="signup" component={SignUp} />
		</Route>

		<Redirect from="/rocketboard" to="/rocketboard/dashboard" />
		<Route path="/rocketboard" component={DashWrapper(App)}>
			<Route path="contact-us" component={ContactUs} />
			<Route path="customers" component={Customers} />
			<Route path="dashboard" component={Dashboard} />
			<Route path="faqs" component={FAQs} />
			<Route path="forms" component={Forms}/>
			<Route path="invoices" component={Invoices} />
			<Route path="messages" component={Messages} />
			<Route path="plans" component={Plans} />
			<Route path="profile" component={Profile} />
			<Route path="settings" component={Settings} />
			<Route path="subscriptions" component={Subscriptions} />
			<Route path="templates" component={Templates} />
			<Route path="transactions" component={Transactions} />
			<Route path="tutorials" component={Tutorials} />
		</Route>

		<Route path="*" component={NotFound} />
	</div>
);

// CONFIG REDUX STORE WITH REDUCERS, MIDDLEWARES, AND BROWSERHISTORY
const store = createStore(rootReducer, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

// APP CONFIG'D WITH REDUX STORE, BROWSERHISTORY AND APP ROUTES
export default function() {
	return (
		<MuiThemeProvider>
			<Provider store={store}>
				<Router onUpdate={() => window.scrollTo(0, 0)} history={history} routes={routes} />
			</Provider>
		</MuiThemeProvider>
	);
};

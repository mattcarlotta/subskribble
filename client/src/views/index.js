import React from 'react';
import { Route, Redirect } from 'react-router';

import App from '../components/app';
// import Campaigns from '../components/dispatchabl/campaigns';
// import ContactUs from '../components/dispatchabl/contact';
import Customers from '../components/dispatchabl/customers';
import CustomerSignup from '../containers/forms/website/CustomerSignupForm';
import Dashboard from '../components/dispatchabl/dashboard';
import DashWrapper from '../components/dispatchabl/navigation/dashWrapper';
// import FAQs from '../components/dispatchabl/faqs';
// import Forms from '../components/dispatchabl/forms';
import ForgotPassword from '../containers/forms/website/resetpasswordForm';
// import Home from '../components/website/home';
// import Invoices from '../components/dispatchabl/invoices';
import LogIn from '../containers/forms/website/loginForm';
import NotFound from '../components/app/notfound/404';
import Plans from '../components/dispatchabl/plans';
// import Profile from '../components/dispatchabl/profile';
// import OnLoadAuth from '../containers/app/OnLoadAuth';
// import RequireAuth from '../containers/auth/RequireAuth';
// import Messages from '../components/dispatchabl/messages';
// import Settings from '../components/dispatchabl/settings';
import SignUp from '../containers/forms/website/signupForm';
// import Subscriptions from '../components/dispatchabl/subscriptions';
// import Templates from '../components/dispatchabl/templates';
// import Transactions from '../components/dispatchabl/transactions';
// import Tutorials from '../components/dispatchabl/tutorials';

// CONFIG APP ROUTE VIEWS
export const views = (
	<div>
		<Redirect from="/" to="/dispatchabl/dashboard" />
		<Route path="/dispatchabl" component={DashWrapper(App)}>
			<Route path="dashboard" component={Dashboard} />
			<Route path="customers" component={Customers} />
			<Route path="customer-signup/:gateway" component={CustomerSignup} />
			<Route path="forgot-password" component={ForgotPassword} />
			<Route path="login" component={LogIn} />
			<Route path="plans" component={Plans} />
			<Route path="signup" component={SignUp} />
		</Route>


		{/*<Route path="/rocketboard" component={DashWrapper(App)}>
			 <Route path="campaigns" component={Campaigns} />
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
		</Route>*/}

		<Route path="*" component={NotFound} />
	</div>
);

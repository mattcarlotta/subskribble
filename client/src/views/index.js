import React from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

import App from '../components/app';
// import Campaigns from '../components/subskribble/campaigns';
// import ContactUs from '../components/subskribble/contact';
import Customers from '../components/subskribble/customers';
import CustomerSignup from '../containers/forms/website/CustomerSignupForm';
import Dashboard from '../components/subskribble/dashboard';
import DashWrapper from '../components/subskribble/navigation/dashWrapper';
// import FAQs from '../components/subskribble/faqs';
// import Forms from '../components/subskribble/forms';
import ForgotPassword from '../containers/forms/website/resetpasswordForm';
// import Home from '../components/website/home';
// import Invoices from '../components/subskribble/invoices';
import Landing from '../components/subskribble/app';
import LogIn from '../containers/forms/website/loginForm';
import NotFound from '../components/app/notfound/404';
import Plans from '../components/subskribble/plans';
// import Profile from '../components/subskribble/profile';
// import OnLoadAuth from '../containers/app/OnLoadAuth';
// import RequireAuth from '../containers/auth/RequireAuth';
// import Messages from '../components/subskribble/messages';
// import Settings from '../components/subskribble/settings';
import SignUp from '../containers/forms/website/signupForm';
// import Subscriptions from '../components/subskribble/subscriptions';
// import Templates from '../components/subskribble/templates';
// import Transactions from '../components/subskribble/transactions';
// import Tutorials from '../components/subskribble/tutorials';

// CONFIG APP ROUTE VIEWS
export const views = (
	<div>
		<Redirect from="/" to="/subskribble" />
		<Route path="/subskribble" component={DashWrapper(App)}>
			<IndexRoute component={Landing} />
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

import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from '../components/app';
// import Campaigns from '../components/rocketboard/campaigns';
// import ContactUs from '../components/rocketboard/contact';
import Customers from '../components/rocketboard/customers';
import CustomerSignup from '../containers/forms/website/CustomerSignupForm';
import Dashboard from '../components/rocketboard/dashboard';
import DashWrapper from '../components/rocketboard/navigation/dashWrapper';
// import FAQs from '../components/rocketboard/faqs';
// import Forms from '../components/rocketboard/forms';
import ForgotPassword from '../containers/forms/website/resetpasswordForm';
import Home from '../components/website/home';
// import Invoices from '../components/rocketboard/invoices';
import LogIn from '../containers/forms/website/loginForm';
import NotFound from '../components/app/notfound/404';
import Plans from '../components/rocketboard/plans';
import Pricing from '../components/website/pricing';
// import Profile from '../components/rocketboard/profile';
// import OnLoadAuth from '../containers/app/OnLoadAuth';
// import RequireAuth from '../containers/auth/RequireAuth';
// import Messages from '../components/rocketboard/messages';
import NavWrapper from '../components/website/navigation/NavWrapper';
// import Settings from '../components/rocketboard/settings';
import SignUp from '../containers/forms/website/signupForm';
// import Subscriptions from '../components/rocketboard/subscriptions';
// import Templates from '../components/rocketboard/templates';
// import Transactions from '../components/rocketboard/transactions';
// import Tutorials from '../components/rocketboard/tutorials';

// CONFIG APP ROUTE VIEWS
export const views = (
	<div>
		<Route path="/" component={NavWrapper(App)}>
			<IndexRoute component={Home} />
			<Route path="customer-signup/:gateway" component={CustomerSignup} />
			<Route path="forgot-password" component={ForgotPassword} />
			<Route path="login" component={LogIn} />
			<Route path="pricing" component={Pricing} />
			<Route path="signup" component={SignUp} />
		</Route>

		<Redirect from="/rocketboard" to="/rocketboard/dashboard" />
		<Route path="/rocketboard" component={DashWrapper(App)}>
			{/* <Route path="campaigns" component={Campaigns} />
			<Route path="contact-us" component={ContactUs} /> */}
			<Route path="customers" component={Customers} />
			<Route path="dashboard" component={Dashboard} />
			{/* <Route path="faqs" component={FAQs} />
			<Route path="forms" component={Forms}/>
			<Route path="invoices" component={Invoices} />
			<Route path="messages" component={Messages} /> */}
			<Route path="plans" component={Plans} />
			{/* <Route path="profile" component={Profile} />
			<Route path="settings" component={Settings} />
			<Route path="subscriptions" component={Subscriptions} />
			<Route path="templates" component={Templates} />
			<Route path="transactions" component={Transactions} />
			<Route path="tutorials" component={Tutorials} /> */}
		</Route>

		<Route path="*" component={NotFound} />
	</div>
);

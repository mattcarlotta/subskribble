import React from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

import App from '../components/app';
import ContactUs from '../components/subskribble/contact';
import CustomerSignup from '../containers/forms/website/CustomerSignupForm';
import Dashboard from '../components/subskribble/dashboard';
import DashWrapper from '../components/subskribble/navigation/dashWrapper';
import FAQs from '../components/subskribble/faqs';
import Forms from '../components/subskribble/forms';
import ForgotPassword from '../containers/forms/website/resetpasswordForm';
// import Home from '../components/website/home';
import Invoices from '../components/subskribble/invoices';
import Landing from '../components/subskribble/app';
import LogIn from '../containers/forms/website/loginForm';
import NotFound from '../components/app/notfound/404';
import Plans from '../components/subskribble/plans';
// import Profile from '../components/subskribble/profile';
import Promos from '../components/subskribble/promos';
// import OnLoadAuth from '../containers/app/OnLoadAuth';
// import RequireAuth from '../containers/auth/RequireAuth';
// import Messages from '../components/subskribble/messages';
// import Settings from '../components/subskribble/settings';
import SignUp from '../containers/forms/website/signupForm';
import Subscribers from '../components/subskribble/subscribers';
import Templates from '../components/subskribble/templates';
import Transactions from '../components/subskribble/transactions';
import Tutorials from '../components/subskribble/tutorials';

// CONFIG APP ROUTE VIEWS
export const views = (
	<div>
		<Redirect from="/" to="/subskribble" />
		<Route path="/subskribble" component={DashWrapper(App)}>
			<IndexRoute component={Landing} />
			<Route path="dashboard" component={Dashboard} />
			<Route path="contact-us" component={ContactUs} />
			<Route path="customer-signup/:gateway" component={CustomerSignup} />
			<Route path="faqs" component={FAQs} />
			<Route path="forgot-password" component={ForgotPassword} />
			<Route path="forms" component={Forms}/>
			<Route path="invoices" component={Invoices} />
			<Route path="login" component={LogIn} />
			<Route path="plans" component={Plans} />
			<Route path="promos" component={Promos} />
			<Route path="signup" component={SignUp} />
			<Route path="subscribers" component={Subscribers} />
			<Route path="templates" component={Templates} />
			<Route path="transactions" component={Transactions} />
			<Route path="tutorials" component={Tutorials} />
		</Route>


		{/*<Route path="/rocketboard" component={DashWrapper(App)}>
			 <Route path="campaigns" component={Campaigns} />


			<Route path="dashboard" component={Dashboard} />



			<Route path="messages" component={Messages} />

			<Route path="profile" component={Profile} />
			<Route path="settings" component={Settings} />
			<Route path="subscriptions" component={Subscriptions} />

		</Route>*/}

		<Route path="*" component={NotFound} />
	</div>
);

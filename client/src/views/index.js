import React, { Fragment } from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

// import App from '../components/subskribble';
import AuthHandler from '../containers/subskribble/app/authentication/AuthHandler';
// import ContactUs from '../components/subskribble/contact';
// import CustomerSignup from '../containers/website/forms/CustomerSignupForm';
// import Dashboard from '../components/subskribble/dashboard';
// import FAQs from '../components/subskribble/faqs';
// import Forms from '../components/subskribble/forms';
// import ForgotPassword from '../containers/website/forms/resetpasswordForm';
// import Home from '../components/website/home';
import Landing from '../components/subskribble/app';
// import LogIn from '../containers/website/forms/loginForm';
import NotFound from '../components/subskribble/app/notfound/404';
import Plans from '../containers/subskribble/plans/Plans';
// import Profile from '../components/subskribble/profile';
import Promos from '../containers/subskribble/promos/Promotionals';
// import OnLoadAuth from '../containers/app/OnLoadAuth';
// import RequireAuth from '../containers/auth/RequireAuth';
// import Messages from '../components/subskribble/messages';
// import Settings from '../components/subskribble/settings';
// import SignUp from '../containers/website/forms/signupForm';
import Subscribers from '../containers/subskribble/subscribers/Subscribers';
// import Templates from '../components/subskribble/templates';
import Transactions from '../containers/subskribble/transactions/Transactions';
// import Tutorials from '../components/subskribble/tutorials';
import VerifyEmail from '../containers/subskribble/app/authentication/VerifyEmail';

// CONFIG APP ROUTE VIEWS
export default (
	<Fragment>
		<Route path="/subskribble/email/:id" component={VerifyEmail} />
		<Redirect from="/" to="/subskribble" />
		<Route path="/subskribble" component={AuthHandler}>
			<IndexRoute component={Landing} />
			{/* <Route path="dashboard" component={Dashboard} /> */}
			{/* <Route path="contact-us" component={ContactUs} /> */}
			{/* <Route path="customer-signup/:gateway" component={CustomerSignup} /> */}
			{/* <Route path="faqs" component={FAQs} /> */}
			{/* <Route path="forgot-password" component={ForgotPassword} /> */}
			{/* <Route path="forms" component={Forms}/> */}
			{/* <Route path="login" component={LogIn} /> */}
			<Route path="plans" component={Plans} />
			<Route path="promotionals" component={Promos} />
			{/* <Route path="signup" component={SignUp} /> */}
			<Route path="subscribers" component={Subscribers} />
			{/* <Route path="templates" component={Templates} /> */}
			<Route path="transactions" component={Transactions} />
			{/* <Route path="tutorials" component={Tutorials} /> */}
		</Route>
		<Route path="*" component={NotFound} />
	</Fragment>
);

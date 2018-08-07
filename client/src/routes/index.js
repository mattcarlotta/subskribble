import React, { Fragment } from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

import App from '../components/subskribble';
import CustomerSignupForm from '../containers/subskribble/forms/CustomerSignupForm';
// import Dashboard from '../components/subskribble/dashboard';
import DeleteAccount from '../containers/subskribble/app/settings/DeleteAccount';
// import Home from '../components/website/home';
import Landing from '../components/subskribble/app/landing';
import NotFound from '../components/subskribble/app/notfound/404';
import Plans from '../containers/subskribble/plans';
import PlansForm from '../containers/subskribble/forms/plansForm';
import Promos from '../containers/subskribble/promos';
import PromosForm from '../containers/subskribble/forms/promosForm';
// import Messages from '../components/subskribble/messages';
import Settings from '../containers/subskribble/app/settings/Settings';
import RequireAuth from '../containers/subskribble/app/auth/RequireAuth';
import ResetPassword from '../containers/subskribble/app/auth/ResetPassword';
import Subscribers from '../containers/subskribble/subscribers';
import Templates from '../containers/subskribble/templates';
import TemplateForm from '../containers/subskribble/forms/templateForm';
import Transactions from '../containers/subskribble/transactions';
import VerifyEmail from '../containers/subskribble/app/auth/VerifyEmail';

// CONFIG APP ROUTE VIEWS
export default (
	<Fragment>
		<Redirect from="/" to="/subskribble" />
		<Route path="/" component={App}>
			<Route path="/subskribble/email/:id" component={VerifyEmail} />
			<Route path="/subskribble/password/:id" component={ResetPassword} />
			<Route path="/subskribble" component={RequireAuth}>
				<IndexRoute component={Landing} />
				{/* <Route path="dashboard" component={Dashboard} /> */}
				<Route path="plans" component={Plans} />
				<Route path="plans/create" component={PlansForm} />
				<Route path="plans/edit/:id" component={PlansForm} />
				<Route path="promotionals" component={Promos} />
				<Route path="promotionals/create" component={PromosForm} />
				<Route path="promotionals/edit/:id" component={PromosForm} />
				<Route path="settings" component={Settings} />
				<Route path="settings/delete-account" component={DeleteAccount} />
				<Route path="subscribers" component={Subscribers} />
				<Route path="subscribers/register" component={CustomerSignupForm} />
				<Route path="templates" component={Templates} />
				<Route path="templates/create" component={TemplateForm} />
				<Route path="templates/edit/:id" component={TemplateForm} />
				<Route path="transactions" component={Transactions} />
				<Route path="*" component={NotFound} />
			</Route>
			<Route path="*" component={NotFound} />
		</Route>
	</Fragment>
);

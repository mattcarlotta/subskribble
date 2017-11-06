import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components';
import Home from '../views/home';
import ForgotPassword from '../views/forgotPassword';
import LogIn from '../views/login';
import NotFound from '../components/notfound/notFound';
// import OnLoadAuth from '../containers/app/OnLoadAuth';
// import RequireAuth from '../containers/auth/RequireAuth';
import ScrollIntoView from '../components/navigation/ScrollIntoView';
import SignUp from '../views/signup';

const routes = (
	<Route path="/" component={ScrollIntoView(App)}>
		<IndexRoute component={Home} />
		<Route path="/login" component={LogIn} />
		<Route path="/forgot-password" component={ForgotPassword} />
		<Route path="/signup" component={SignUp} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;

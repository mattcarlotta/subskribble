import React, { Fragment } from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

import App from '../components';
import ButtonLoading from '../containers/app/buttons/ButtonLoading';
import CustomerSignupForm from '../containers/forms/CustomerSignupForm';
import Dashboard from '../containers/dashboard';
import DeleteAccount from '../containers/app/settings/DeleteAccount';
// import Home from '../components/website/home';
import Landing from '../components/landing';
import MessageForm from '../containers/forms/MessageForm';
import NotFound from '../components/app/notfound/404/404';
import Plans from '../containers/plans';
import PlansForm from '../containers/forms/PlansForm';
import Promos from '../containers/promos';
import PromosForm from '../containers/forms/PromosForm';
import Messages from '../containers/messages';
import RefundForm from '../containers/forms/RefundForm';
import RequireAuth from '../containers/app/auth/RequireAuth';
import ResetPassword from '../containers/app/auth/ResetPassword';
import Settings from '../containers/app/settings/Settings';
import Subscribers from '../containers/subscribers';
import Templates from '../containers/templates';
import TemplateForm from '../containers/forms/TemplateForm';
import Transactions from '../containers/transactions';
import VerifyEmail from '../containers/app/auth/VerifyEmail';

// CONFIG APP ROUTE VIEWS
export default (
  <Fragment>
    <Redirect from="/" to="/subskribble" />
    <Route path="/" component={App}>
      <Route path="/subskribble/email/:id" component={VerifyEmail} />
      <Route path="/subskribble/password/:id" component={ResetPassword} />
      <Route path="/subskribble" component={RequireAuth}>
        <IndexRoute component={Landing} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="messages" component={Messages} />
        <Route path="messages/create" component={ButtonLoading(MessageForm)} />
        <Route path="plans" component={Plans} />
        <Route path="plans/create" component={ButtonLoading(PlansForm)} />
        <Route path="plans/edit/:id" component={ButtonLoading(PlansForm)} />
        <Route path="promotionals" component={Promos} />
        <Route
          path="promotionals/create"
          component={ButtonLoading(PromosForm)}
        />
        <Route
          path="promotionals/edit/:id"
          component={ButtonLoading(PromosForm)}
        />
        <Route path="settings" component={Settings} />
        <Route path="settings/delete-account" component={DeleteAccount} />
        <Route path="subscribers" component={Subscribers} />
        <Route
          path="subscribers/register"
          component={ButtonLoading(CustomerSignupForm)}
        />
        <Route path="templates" component={Templates} />
        <Route
          path="templates/create"
          component={ButtonLoading(TemplateForm)}
        />
        <Route
          path="templates/edit/:id"
          component={ButtonLoading(TemplateForm)}
        />
        <Route path="transactions" component={Transactions} />
        <Route
          path="transactions/edit/:id"
          component={ButtonLoading(RefundForm)}
        />
        <Route path="*" component={NotFound} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Fragment>
);

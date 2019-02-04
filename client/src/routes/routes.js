import React, { Fragment } from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

import App from '../components';
import ButtonLoading from '../containers/app/buttons/ButtonLoading';
import CustomerSignupForm from '../containers/forms/CustomerSignupForm/CustomerSignupForm';
import Dashboard from '../containers/dashboard/dashboard.js';
import DeleteAccount from '../containers/app/settings/DeleteAccount/DeleteAccount';
import Landing from '../components/landing/landing.js';
import MessageForm from '../containers/forms/MessageForm/MessageForm';
import NotFound from '../components/app/notfound/404/404.js';
import Plans from '../containers/plans/plans.js';
import PlansForm from '../containers/forms/PlansForm/PlansForm';
import Promos from '../containers/promos/promos.js';
import PromosForm from '../containers/forms/PromosForm/PromosForm';
import Messages from '../containers/messages/messages.js';
import RefundForm from '../containers/forms/RefundForm/RefundForm';
import RequireAuth from '../containers/app/auth/RequireAuth/RequireAuth';
import ResetPassword from '../containers/app/auth/ResetPassword/ResetPassword';
import Settings from '../containers/app/settings/Settings/Settings';
import Subscribers from '../containers/subscribers/subscribers.js';
import Templates from '../containers/templates/templates.js';
import TemplateForm from '../containers/forms/TemplateForm/TemplateForm';
import Transactions from '../containers/transactions/transactions.js';
import VerifyEmail from '../containers/app/auth/VerifyEmail/VerifyEmail';

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

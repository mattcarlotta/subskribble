import map from 'lodash/map';
import React, { Fragment } from 'react';

export default ({ fromsender, plans, subject }) => (
  <Fragment>
    <div className="disabled-inputs">
      {plans
        ? map(plans, (plan, key) => (
            <div key={key} className="tags">
              {plan}
            </div>
          ))
        : 'Template plans.'}
    </div>
    <div className="disabled-inputs">
      {fromsender ? fromsender : 'Template sender email address.'}
    </div>
    <div className="disabled-inputs">
      {subject ? subject : 'Template subject.'}
    </div>
  </Fragment>
);

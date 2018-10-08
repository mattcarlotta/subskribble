import map from 'lodash/map';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const DisabledFields = ({ fromsender, plans, subject }) => (
  <Fragment>
    <div className="disabled-inputs">
      {plans ? (
        <Fragment>
          {map(plans, (plan, key) => (
            <div key={key} className="tags">
              {plan}
            </div>
          ))}
        </Fragment>
      ) : (
        'Template plans.'
      )}
    </div>
    <div className="disabled-inputs">
      {fromsender || 'Template sender email address.'}
    </div>
    <div className="disabled-inputs">{subject || 'Template subject.'}</div>
  </Fragment>
);

export default DisabledFields;

DisabledFields.propTypes = {
  fromsender: PropTypes.string,
  plans: PropTypes.arrayOf(PropTypes.string),
  subject: PropTypes.string,
};

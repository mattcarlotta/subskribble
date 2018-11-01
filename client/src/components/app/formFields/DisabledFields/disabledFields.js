import map from 'lodash/map';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { disabledInputs, disabledTags } from '../../../../styles';

const DisabledFields = ({ fromsender, plans, subject }) => (
  <Fragment>
    <div className={disabledInputs}>
      {plans ? (
        <Fragment>
          {map(plans, (plan, key) => (
            <div key={key} className={disabledTags}>
              {plan}
            </div>
          ))}
        </Fragment>
      ) : (
        'Template plans.'
      )}
    </div>
    <div className={disabledInputs}>
      {fromsender || 'Template sender email address.'}
    </div>
    <div className={disabledInputs}>{subject || 'Template subject.'}</div>
  </Fragment>
);

export default DisabledFields;

DisabledFields.propTypes = {
  fromsender: PropTypes.string,
  plans: PropTypes.arrayOf(PropTypes.string),
  subject: PropTypes.string,
};

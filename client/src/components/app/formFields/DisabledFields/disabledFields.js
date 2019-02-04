import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { disabledInputs, disabledTags } from '../../../../styles/styles.scss';

const DisabledFields = ({ fromsender, plans, subject }) => (
  <div className="disabledOptions">
    <div className={`plans ${disabledInputs}`}>
      {isEmpty(plans) ? (
        'Template plans.'
      ) : (
        <Fragment>
          {map(plans, (plan, key) => (
            <div key={key} className={disabledTags}>
              {plan}
            </div>
          ))}
        </Fragment>
      )}
    </div>
    <div className={`fromsender ${disabledInputs}`}>
      {fromsender || 'Template sender email address.'}
    </div>
    <div className={`subject ${disabledInputs}`}>
      {subject || 'Template subject.'}
    </div>
  </div>
);

export default DisabledFields;

DisabledFields.propTypes = {
  fromsender: PropTypes.string,
  plans: PropTypes.arrayOf(PropTypes.string),
  subject: PropTypes.string,
};

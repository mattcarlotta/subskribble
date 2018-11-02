import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import { AntFormFields } from '../../app/formFields/antReduxFormFields';
import BillingSwitchField from './renderBillingSwitchField';
import { input100 } from '../../../styles';

const RenderFormFields = ({ billingSwitch, fields, title }) => (
  <Col span={12}>
    <h3>
      {title} {billingSwitch && <BillingSwitchField />}
    </h3>
    <div className={input100}>
      <AntFormFields FIELDS={fields} />
    </div>
  </Col>
);

export default RenderFormFields;

RenderFormFields.propTypes = {
  billingSwitch: PropTypes.bool,
  title: PropTypes.string,
  fields: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

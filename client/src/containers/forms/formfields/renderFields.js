import map from 'lodash/map';
import React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

const RenderFields = FIELDS => {
  return map(FIELDS, ({ className, component, floatingLabelText, label, labelPosition, name, normalize, onChange, width, validate, MENUITEMS }, key) => {
    return !label
      ? <div key={key} className={className}>
          <Field
            component={component || TextField}
            floatingLabelText={floatingLabelText ? floatingLabelText : null}
            name={name}
            normalize={normalize}
            type="text"
            style={{ fontSize: 15, width }}
            validate={validate}
          >
            {MENUITEMS && map(MENUITEMS, (value) => {
              return <MenuItem key={value} value={value} primaryText={value} />
            })}
          </Field>
        </div>
      : <div key={key} className={className}>
          <Field
            name={name}
            component={component}
            label={label}
            labelPosition={labelPosition}
            onChange={onChange}
          />
        </div>
  })
}

export default RenderFields;

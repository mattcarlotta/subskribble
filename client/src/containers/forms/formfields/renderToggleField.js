import React  from 'react';

import Toggle from 'material-ui/Toggle';

const RenderToggleField = (field, setBillingFieldValues, destroy) => {
  return (
    <Toggle
      toggled={!field.input.value ? false : field.input.value}
      onChange={(event, newValue) => {
        field.input.onChange(newValue);
      }}
      onClick={!field.input.value ? setBillingFieldValues : () => destroy()}
    />
  );
}

export default RenderToggleField;

import React from 'react';
import ChipInput from 'material-ui-chip-input'

const RenderChipField = ({input, hintText, floatingLabelText, meta: { touched, error }}) => {
  return(
    <ChipInput
      {...input}
      value = { input.value || []}
      onRequestAdd={(addedChip) => {
        let values = input.value || [];
        values = values.slice();
        values.push(addedChip);
        input.onChange(values);
      }}
      onRequestDelete={(deletedChip) => {
        let values = input.value || [];
        values = values.filter(v => v !== deletedChip);
        input.onChange(values);
      }}
      onBlur={() => input.onBlur()}
      hintText={hintText}
      errorText={touched && input.value.length === 0 ? error : ''}
      floatingLabelText={floatingLabelText}
      chipContainerStyle={{ backgroundColor: '#03a9f3', color: "#fff"}}
      fullWidth={true}
      className="override-chip-style"
    />
  );
}

export default RenderChipField;

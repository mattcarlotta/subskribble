import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const RenderClearButton = ({ backgroundColor, buttonStyle, label, labelStyle, primary, pristine, reset, submitting, style }) => {
	return (
		<RaisedButton
			type="clear"
			label={label}
			primary={primary}
			fullWidth={true}
			disabled={pristine || submitting}
      onClick={reset}
			backgroundColor={backgroundColor}
			buttonStyle={buttonStyle}
			labelStyle={labelStyle}
			style={style}
		/>
	);
};

export default RenderClearButton;

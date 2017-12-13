import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const RenderSubmitButton = ({ backgroundColor, buttonStyle, fullWidth, label, labelStyle, primary, submitting, style }) => {
	return (
		<RaisedButton
			type="submit"
			label={label}
			primary={primary}
			fullWidth={fullWidth}
			disabled={submitting}
			backgroundColor={backgroundColor}
			buttonStyle={buttonStyle}
			labelStyle={labelStyle}
			style={style}
		/>
	);
};

export default RenderSubmitButton;

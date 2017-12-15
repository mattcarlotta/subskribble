import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const RenderSubmitButton = ({
	backgroundColor,
	buttonStyle,
	fontSize,
	floatStyle,
	fullWidth,
	height,
	label,
	labelStyle,
	onClick,
	primary,
	pristine,
	submitting,
	type,
	width
}) => {
	return (
		<RaisedButton
			backgroundColor={backgroundColor}
			buttonStyle={{ border: 'none', borderRadius: 5 }}
			disabled={submitting || pristine}
			label={label}
			onClick={onClick}
			primary={primary}
			fullWidth={fullWidth}
			labelColor="#fbe2dd"
			labelStyle={{ fontSize, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
			style={{ height, width, marginTop: 15, borderRadius: 6, float: floatStyle }}
			type={type}
		/>
	);
};

export default RenderSubmitButton;

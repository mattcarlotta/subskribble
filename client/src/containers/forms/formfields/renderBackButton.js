import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const RenderClearButton = ({ backgroundColor, buttonStyle, label, labelStyle, onClick, style }) => {
	return (
		<RaisedButton
			label={label}
      onClick={onClick}
			backgroundColor={backgroundColor}
			buttonStyle={buttonStyle}
			labelStyle={labelStyle}
			style={style}
		/>
	);
};

export default RenderClearButton;

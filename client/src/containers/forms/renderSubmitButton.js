import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const RenderSubmitButton = ({ label, submitting }) => {
	return (
			<RaisedButton
				type="submit"
				label={label}
				primary={true}
				fullWidth={true}
				disabled={submitting}
			/>
	);
};

export default RenderSubmitButton;

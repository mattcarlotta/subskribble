import React from 'react';
import EmptyPreview from './emptyPreview';
import ShowPreview from './showPreview';

export default props => (
	<div className="preview-box-container">
		<h1 style={{ textAlign: 'center', marginBottom: 30 }}>Template Preview</h1>
		{ (!props.fromSender && !props.subject && (props.message === "<p><br></p>" || !props.message))
			? <EmptyPreview />
			: <ShowPreview {...props} />
		}
	</div>
)

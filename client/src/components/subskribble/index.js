import React, { Fragment } from 'react';

import RenderErrors from '../../containers/subskribble/app/renderErrors';

export default ({ children }) => (
	<Fragment>
		{ children }
		<RenderErrors />
	</Fragment>
)

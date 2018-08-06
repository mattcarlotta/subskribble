import React from 'react';
import { Link } from 'react-router';

export default () => (
	<div className="delete-account-details">
		<div className="delete-button-container">
			<Link
				className="ant-btn btn-danger"
				to="/subkskribble/remove_my_account"
				style={{ fontSize: '18px', height: '45px' }}
				>
					<span style={{ position: 'relative', top: 6 }}>
						Delete
					</span>
				</Link>
		</div>
		<div className="delete-account-information">
			<p className="information">
				<span className="bold">Warning! Deleting your account is irreversible.</span>
				<br />
				If you are experiencing any issues with your account, please contact helpdesk@subskribble.com.
			</p>
		</div>
	</div>
)

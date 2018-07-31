import React, { PureComponent } from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';

export default class DeleteItem extends PureComponent {
	handleDelete = () => {
		const { deleteAction, id, plan } = this.props;
		deleteAction(id,plan);
	}

	render = () => (
		<Popconfirm
			arrowPointAtCenter
			cancelText="No"
			title="Are you sure you want to delete this item?"
			okText="Yes"
			onConfirm={this.handleDelete}
			overlayClassName="table-tooltip"
		>
			<Tooltip
				arrowPointAtCenter
				placement="bottom"
				title="Delete"
			>
				<Button className="table-status-action">
					<i className="material-icons">delete</i>
				</Button>
			</Tooltip>
		</Popconfirm>
	)
}

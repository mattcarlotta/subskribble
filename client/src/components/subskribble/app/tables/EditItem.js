import React, { PureComponent, Fragment } from 'react';
import { Button, Divider, Popconfirm, Tooltip } from 'antd';
import { browserHistory } from 'react-router';

export default class EditItem extends PureComponent {
	handleEdit = () => {
		// console.log(`requested to edit this record: ${this.props.id}`);
		browserHistory.push(`/subskribble/${this.props.editLocation}/edit/${this.props.editLocation}?id=${this.props.id}`)
	}

	render = () => (
		<Fragment>
			<Popconfirm
				arrowPointAtCenter
				cancelText="No"
				title="Are you sure you want to edit this item?"
				okText="Yes"
				onConfirm={this.handleEdit}
				overlayClassName="table-tooltip"
				>
					<Tooltip
						arrowPointAtCenter
						placement="bottom"
						title="Edit"
					>
						<Button className="table-status-action">
							<i className="material-icons">create</i>
						</Button>
					</Tooltip>
			</Popconfirm>
			<Divider type="vertical" />
		</Fragment>
	)
}

import React, { PureComponent } from 'react';
import { Table } from 'antd';
import TableActions from './TableActions';

export default class TableList extends PureComponent {
	handlePageChange = pagination => {
		const { fetchAction, TAB, sortByNum } = this.props;
		let { current: limitCount } = pagination;
		this.props.selectCurrentPage(limitCount);
		limitCount = limitCount - 1;
		fetchAction(TAB, limitCount, sortByNum);
	};

	render = () => {
		const {
			current,
			deleteAction,
			editLocation,
			sortByNum,
			TABLECONTENTS,
			TABLEHEADERS,
			TABLERECORDS,
			updateAction
		} = this.props;

		return (
			<div className="table-container">
				<Table
					columns={[
						...TABLEHEADERS,
						{
							title: 'Actions',
							key: 'action',
							width: 300,
							render: record => (
								<TableActions
									deleteAction={deleteAction}
									editLocation={editLocation}
									record={record}
									updateAction={updateAction}
								/>
							)
						}
					]}
					bordered={true}
					dataSource={TABLECONTENTS}
					pagination={{
						defaultCurrent: 1,
						current,
						pageSize: sortByNum,
						total: TABLERECORDS
					}}
					size="middle"
					onChange={this.handlePageChange}
				/>
			</div>
		);
	};
}

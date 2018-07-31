import React, { PureComponent } from 'react';
import { Steps } from 'antd';
const { Step } = Steps;

export default class Stepper extends PureComponent {
	handleEditStep = () => this.props.onClick(this.props.stepKey);

	render = () => {
		const { confirmLoading, icon, stepKey, title, wasReviewed, ...rest } = this.props;
		return (
			<Step
				{...rest}
				key={stepKey}
				icon={<i className="material-icons">{icon}</i>}
				className={wasReviewed ? "fix-cursor" : "" }
				onClick={wasReviewed && !confirmLoading ? this.handleEditStep : undefined}
				title={title}
			/>
		)
	}
}

import map from 'lodash/map';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Steps } from 'antd';
import Stepper from './Stepper';
import RegisterPlanForm from './RegisterPlanForm';
import { subRegisterToPlan } from '../../../actions/formActions';
import { getCustomerFormFields } from '../app/formFields/customerSignupFields';
import planActions from '../../../actions/planActions';
const { fetchAllActivePlans } = planActions;

const stepLabels = [
	{ title: 'Contact Information', icon: 'mail_outline' },
	{ title: 'Plan', icon: 'content_paste' },
	{ title: 'Review', icon: 'shopping_cart' }
];

class CustomerPlanSignup extends Component {
	state = {
		confirmLoading: false,
		formFields: getCustomerFormFields(),
		isLoading: true,
		stepIndex: 0,
		visited: [],
		wasReviewed: false
	};

	componentDidMount = () => {
		this.props.fetchAllActivePlans()
		.then(({data: {activeplans}}) => {
			activeplans ? this.setState({ isLoading: false, plans: activeplans}) : browserHistory.goBack()
		})
		.catch(() => null)
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { serverError } = this.props;
		serverError !== prevProps.serverError && serverError !== undefined && this.resetLoadButton();
	}

	editStep = number => this.setState({ formFields: getCustomerFormFields(number), stepIndex: number })

	handleFormSave = (formProps) => {
		const { subRegisterToPlan } = this.props;
		this.showLoadingButton();
		subRegisterToPlan(formProps);
	}

	handleNext = () => {
		const { stepIndex, visited } = this.state;
		const formKey = stepIndex + 1;
		this.setState({
			formFields: getCustomerFormFields(formKey),
			stepIndex: formKey,
			visited: visited.concat(stepIndex).filter((val, idx, arr) => (arr.indexOf(val) === idx)),
			wasReviewed: visited.length > 0 && true
		})
	}

	handlePrev = () => {
		const formKey = this.state.stepIndex - 1;
		this.setState({ formFields: getCustomerFormFields(formKey), stepIndex: formKey })
	}

	showLoadingButton = () => this.setState({ confirmLoading: !this.state.confirmLoading });

	resetLoadButton = () => this.setState({ confirmLoading: false })

	goBackPage = () => browserHistory.goBack();

	render() {
		const { confirmLoading, formFields, isLoading, plans, stepIndex, wasReviewed } = this.state;
		const finished = stepIndex === 2;
		return (
			isLoading
				? null
				: <div className="customer-signup-bg">
						<div className="customer-signup-container">
							<div className="stepper-container">
								<div className="title">
									<h1>Subscriber Registration</h1>
								</div>
								<Steps current={stepIndex}>
									{map(stepLabels, ({ title, icon }, key) => (
										<Stepper
											confirmLoading={confirmLoading}
											icon={icon}
											key={title}
											onClick={this.editStep}
											stepKey={key}
											title={title}
											wasReviewed={wasReviewed}
										/>
									))}
								</Steps>
							</div>
							<RegisterPlanForm
								{...formFields}
								confirmLoading={confirmLoading}
								finished={finished}
								editStep={!confirmLoading ? this.editStep : null}
								onClickBack={ stepIndex > 0 ? this.handlePrev : this.goBackPage }
								onSubmit={ finished ? this.handleFormSave : this.handleNext }
								plans={plans}
								showPlans={ stepIndex === 1 ? true : false }
								showContactInfo={ stepIndex === 0 ? true : false }
							/>
						</div>
					</div>
				);
	}
}

export default connect(state => ({ serverError: state.server.error }), { fetchAllActivePlans, subRegisterToPlan })(CustomerPlanSignup);

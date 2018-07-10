import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Row, Col } from 'antd';
import { AntFormFields, AntSelectField, AntStepFormButtons } from '../app/formFields/antReduxFormFields';

import Spinner from '../app/loading/Spinner';
import QuillEditor from '../app/formFields/QuillEditor';
import TemplatePreview from '../../../components/subskribble/app/editor/templatePreview';
import FIELDS from '../app/formFields/templateFormFields';
import { isNotEmpty } from '../app/formFields/validateFormFields';

import { addNewTemplate, editTemplate } from '../../../actions/formActions';
import planActions from '../../../actions/planActions';
import templateActions from '../../../actions/templateActions'
const { fetchAllActivePlans } = planActions;
const { fetchTemplate } = templateActions;

class CreateNewTemplate extends Component {
  state = { confirmLoading: false, isLoading: true, selectOptions: [] };

  componentDidMount = () => {
    const { id } = this.props.location.query;
    !id ? this.fetchPlans() : this.fetchTemplateForEditing(id)

  }

  componentDidUpdate = (prevProps, prevState) => {
    const { serverError } = this.props;
    serverError !== prevProps.serverError && serverError !== undefined && this.setState({  confirmLoading: false });
  }

  fetchPlans = () => {
    this.props.fetchAllActivePlans()
    .then(({data: {activeplans}}) => this.setState({ isLoading: false, selectOptions: activeplans }))
    .catch(() => null)
  }

  fetchTemplateForEditing = id => {
    this.props.fetchTemplate(id)
    .then(({ data }) => {
      this.setState({ selectedPlans: data.plans }, () => {
        this.props.initialize(data)
        this.fetchPlans()
      })
    })
    .catch((err) => console.log(err))
  }

	handleFormSubmit = (formProps) => {
    this.setState({ confirmLoading: true });
    const { id } = this.props.location.query;
    !id ? this.props.addNewTemplate(formProps) : this.props.editTemplate(id, formProps)
	}

  goBackPage = () => browserHistory.goBack();

  render = () => {
    const { handleSubmit, pristine, submitting } = this.props;
    const { confirmLoading, selectOptions, isLoading, selectedPlans } = this.state;

    return (
      isLoading
        ? <Spinner />
        : <div className="new-form-container">
          <Row>
            <Col span={12}>
              <div className="form-box-container">
                <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
                  {!this.props.location.query.id ? 'Create' : 'Edit'} Template
                </h1>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                  <AntSelectField
                    className="tag-container"
                    name="plans"
                    mode="tags"
                    placeholder="Click here to associate plans to the form."
                    style={{ width: '100%' }}
                    selectOptions={selectOptions}
                    tokenSeparators={[',']}
                    validate={[isNotEmpty]}
                    defaultValue={selectedPlans}
                  />
                  <AntFormFields FIELDS={FIELDS} />
                  <QuillEditor />
                  <hr />
                  <AntStepFormButtons
                    backLabel="Back"
                    backStyle={{ height: 50, float: 'left' }}
                    confirmLoading={confirmLoading}
                    onClickBack={this.goBackPage}
                    pristine={pristine}
                    submitLabel="Submit"
                    submitStyle= {{ height: 50, float: 'right' }}
                    submitting={submitting}
                  />
                </form>
              </div>
            </Col>
            <Col span={12}>
              <TemplatePreview {...this.props} />
            </Col>
          </Row>

          </div>
    )
  }
};

const selector = formValueSelector('NewTemplate');
export default reduxForm({ form: 'NewTemplate' })(connect(state => ({
  company: state.auth.company,
  message: selector(state, 'message'),
  fromSender: selector(state, 'fromSender'),
  subject: selector(state, 'subject'),
  serverError: state.server.error
}), { addNewTemplate, editTemplate, fetchAllActivePlans, fetchTemplate })(CreateNewTemplate));

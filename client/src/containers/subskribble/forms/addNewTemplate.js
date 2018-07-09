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

import { addNewTemplate } from '../../../actions/formActions';
import actions from '../../../actions/planActions';
const { fetchAllActivePlans } = actions;

class CreateNewTemplate extends Component {
  state = { confirmLoading: false, isLoading: true, selectOptions: [] };

  componentDidMount = () => {
    this.props.fetchAllActivePlans()
    .then(({data: {activeplans}}) => this.setState({ isLoading: false, selectOptions: activeplans }))
    .catch(() => null)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { serverError } = this.props;
    serverError !== prevProps.serverError && serverError !== undefined && this.setState({  confirmLoading: false });
  }

	handleFormSubmit = (formProps) => {
    this.setState({ confirmLoading: true });
    this.props.addNewTemplate(formProps);
	}

  goBackPage = () => browserHistory.goBack();

  render = () => {
    const { handleSubmit, pristine, submitting } = this.props;
    const { confirmLoading, selectOptions, isLoading } = this.state;

    return (
      isLoading
        ? <Spinner />
        : <div className="new-form-container">
          <Row>
            <Col span={12}>
              <div className="form-box-container">
                <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Create Template</h1>
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
}), { addNewTemplate, fetchAllActivePlans })(CreateNewTemplate));

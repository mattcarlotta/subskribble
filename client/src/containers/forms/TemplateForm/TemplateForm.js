import map from 'lodash/map';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import {
  AntFormFields,
  AntSelectField,
  AntStepFormButtons,
} from 'containers/app/formFields/antReduxFormFields.js';
import Spinner from 'components/app/loading/Spinner/Spinner.js';
import QuillEditor from 'containers/app/formFields/QuillEditor.js';
import TemplatePreview from 'components/app/editor/TemplatePreview/templatePreview.js';
import { isNotEmpty } from 'containers/app/formFields/validateFormFields.js';
import { addNewTemplate, editTemplate } from 'actions/formActions.js';
import { fetchAllActivePlans } from 'actions/planActions.js';
import { fetchTemplate } from 'actions/templateActions.js';
import { formBoxContainer } from 'styles/styles.scss';
import FIELDS from './templateFormFields.js';

export class TemplateForm extends Component {
  state = { isLoading: true, selectOptions: [] };

  componentDidMount = () => {
    const { id } = this.props.location.query;
    if (!id) {
      this.fetchPlans();
    } else {
      this.fetchTemplateForEditing(id);
    }
  };

  fetchPlans = () => {
    this.props
      .fetchAllActivePlans()
      .then(({ data: { activeplans } }) =>
        this.setState({
          isLoading: false,
          selectOptions: map(activeplans, ({ planname }) => planname),
        }),
      )
      .catch(() => this.props.handleGoBack());
  };

  fetchTemplateForEditing = id => {
    this.props
      .fetchTemplate(id)
      .then(({ data }) => {
        this.setState({ selectedPlans: data.plans }, () => {
          this.props.initialize(data);
          this.fetchPlans();
        });
      })
      .catch(() => this.props.handleGoBack());
  };

  handleFormSubmit = formProps => {
    const { id } = this.props.location.query;
    this.props.showButtonLoading();
    if (!id) {
      this.props.addNewTemplate(formProps);
    } else {
      this.props.editTemplate(id, formProps);
    }
  };

  render = () => {
    const { confirmLoading, handleSubmit, pristine, submitting } = this.props;
    const { selectOptions, isLoading, selectedPlans } = this.state;

    return isLoading ? (
      <Spinner />
    ) : (
      <Row>
        <Col span={12}>
          <div style={{ height: 910 }} className={formBoxContainer}>
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
                hasFeedback
              />
              <AntFormFields FIELDS={FIELDS} />
              <QuillEditor />
              <hr />
              <AntStepFormButtons
                backLabel="Back"
                backStyle={{ height: 50, float: 'left' }}
                column={12}
                confirmLoading={confirmLoading}
                onClickBack={this.props.handleGoBack}
                pristine={pristine}
                submitLabel="Submit"
                submitStyle={{ height: 50, float: 'right' }}
                submitting={submitting}
              />
            </form>
          </div>
        </Col>
        <Col span={12}>
          <TemplatePreview {...this.props} />
        </Col>
      </Row>
    );
  };
}

TemplateForm.propTypes = {
  addNewTemplate: PropTypes.func.isRequired,
  company: PropTypes.string,
  confirmLoading: PropTypes.bool.isRequired,
  editTemplate: PropTypes.func.isRequired,
  fetchAllActivePlans: PropTypes.func.isRequired,
  fetchTemplate: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  message: PropTypes.string,
  fromsender: PropTypes.string,
  pristine: PropTypes.bool.isRequired,
  showButtonLoading: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  subject: PropTypes.string,
};

const selector = formValueSelector('NewTemplate');
export default reduxForm({ form: 'NewTemplate' })(
  connect(
    state => ({
      company: state.auth.company,
      message: selector(state, 'message'),
      fromsender: selector(state, 'fromsender'),
      subject: selector(state, 'subject'),
    }),
    { addNewTemplate, editTemplate, fetchAllActivePlans, fetchTemplate },
  )(TemplateForm),
);

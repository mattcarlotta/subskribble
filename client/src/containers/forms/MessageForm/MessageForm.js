import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import {
  AntSelectField,
  AntStepFormButtons,
} from '../../app/formFields/antReduxFormFields.js';
import Spinner from '../../../components/app/loading/Spinner/Spinner.js';
import TemplatePreview from '../../../components/app/editor/TemplatePreview/templatePreview.js';
import DisabledFields from '../../../components/app/formFields/DisabledFields/disabledFields.js';
import { sendMessageToSubs } from '../../../actions/formActions.js';
import { fetchAllActiveTemplates } from '../../../actions/templateActions.js';
import { isNotEmpty } from '../../app/formFields/validateFormFields.js';
import { formBoxContainer } from '../../../styles/styles.scss';

class MessageForm extends Component {
  state = {
    availableTemplates: [],
    isLoading: true,
    previewTemplate: [],
    selectTemplateOptions: [],
  };

  componentDidMount = () => this.fetchItems();

  componentDidUpdate = prevProps => {
    const { selectedTemplate } = this.props;
    if (selectedTemplate !== prevProps.selectedTemplate)
      this.updateTemplatePreview(selectedTemplate);
  };

  fetchItems = () => {
    this.props
      .fetchAllActiveTemplates()
      .then(({ data: { activetemplates } }) => {
        this.setState({
          availableTemplates: [...activetemplates],
          isLoading: false,
          selectTemplateOptions: map(
            activetemplates,
            ({ templatename }) => templatename,
          ),
        });
      })
      .catch(() => this.props.handleGoBack());
  };

  updateTemplatePreview = selectedTemplate => {
    const { availableTemplates } = this.state;
    const filtered = filter(
      availableTemplates,
      props => props.templatename === selectedTemplate,
    );
    if (!isEmpty(filtered)) this.setState({ previewTemplate: filtered[0] });
  };

  handleFormSubmit = formProps => {
    this.props.showButtonLoading();
    this.props.sendMessageToSubs(formProps);
  };

  render = () => {
    const { confirmLoading, handleSubmit, pristine, submitting } = this.props;
    const { isLoading, selectTemplateOptions } = this.state;

    return isLoading ? (
      <Spinner />
    ) : (
      <Row>
        <Col span={12}>
          <div style={{ height: 910 }} className={formBoxContainer}>
            <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
              Send Message
            </h1>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="input-100">
                <AntSelectField
                  disabled={confirmLoading}
                  name="template"
                  placeholder="Click to select a template."
                  style={{ width: '100%' }}
                  selectOptions={selectTemplateOptions}
                  tokenSeparators={[',']}
                  validate={[isNotEmpty]}
                />
              </div>
              <DisabledFields {...this.state.previewTemplate} />
              <div style={{ marginBottom: 460 }} />
              <hr />
              <AntStepFormButtons
                backLabel="Back"
                backStyle={{ height: 50, float: 'left' }}
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
          <div className="new-form-container">
            <TemplatePreview
              text="Select a template to update this preview!"
              company={this.props.company}
              {...this.state.previewTemplate}
            />
          </div>
        </Col>
      </Row>
    );
  };
}

const selector = formValueSelector('MessageForm');
export default reduxForm({
  form: 'MessageForm',
})(
  connect(
    state => ({
      company: state.auth.company,
      selectedTemplate: selector(state, 'template'),
    }),
    { fetchAllActiveTemplates, sendMessageToSubs },
  )(MessageForm),
);

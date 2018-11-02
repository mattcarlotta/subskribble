import map from 'lodash/map';
import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import {
  AntFormFields,
  AntSelectField,
  AntStepFormButtons,
} from '../../app/formFields/antReduxFormFields';
import Spinner from '../../../components/app/loading/Spinner/Spinner';
import QuillEditor from '../../app/formFields/QuillEditor';
import TemplatePreview from '../../../components/app/editor/TemplatePreview/templatePreview';
import FIELDS from './templateFormFields';
import { isNotEmpty } from '../../app/formFields/validateFormFields';
import { addNewTemplate, editTemplate } from '../../../actions/formActions';
import { fetchAllActivePlans } from '../../../actions/planActions';
import { fetchTemplate } from '../../../actions/templateActions';
import { formBoxContainer } from '../../../styles';

class TemplateForm extends Component {
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
      .catch(() => this.props.goBack());
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
      .catch(() => this.props.goBack());
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
          <div style={{ height: 881 }} className={formBoxContainer}>
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
          <TemplatePreview
            {...this.props}
            text="Fill in the fields to update this preview!"
          />
        </Col>
      </Row>
    );
  };
}

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

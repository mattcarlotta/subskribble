import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Col, Button, Icon, Tooltip } from 'antd';
import { AntUpload } from '../../app/formFields/antReduxFormFields.js';
import {
  hasFileList,
  isRequired,
} from '../../app/formFields/validateFormFields.js';

class AvatarForm extends Component {
  state = {
    confirmLoading: false,
    fileList: [],
    imageUrl: '',
    previewImage: false,
  };

  componentDidUpdate = prevProps => {
    const { avatarURL, hideAvatarForm, serverError } = this.props;
    if (serverError !== prevProps.serverError && serverError !== undefined)
      this.handleResetForm();
    if (avatarURL !== prevProps.avatarURL && avatarURL !== undefined)
      hideAvatarForm();
  };

  beforeUpload = file =>
    new Promise((resolve, reject) => {
      this.validateFile(file)
        .then(imageUrl => {
          this.setState({ imageUrl });
          resolve(file);
        })
        .catch(({ height, width }) => {
          this.props.serverErrorMessage(
            `Only 10MB@256px/256px (image/jpg,png,bmp,gif) files are accepted! Instead, received a: ${(
              file.size / 1024000
            ).toFixed(2)}MB@${height || '0'}px/${width || 0}px (${file.type}).`,
          );
          reject(file);
        });
    });

  onCancel = () => this.setState({ previewImage: false });

  handleFileChange = ({ file, fileList }) => {
    file.status = 'done';
    this.setState({ fileList });
  };

  handlePreview = () => this.setState({ previewImage: true });

  handleRemove = () => this.setState({ imageUrl: '' });

  handleResetForm = () => this.setState({ confirmLoading: false });

  readFile = (file, resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => {
        if (image.height <= 256 || image.width <= 256) {
          resolve(reader.result);
        } else {
          reject({ height: image.height, width: image.width });
        }
      };
    });
    reader.readAsDataURL(file);
  };

  validateFile = file =>
    new Promise((resolve, reject) => {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif';
      const isBMP = file.type === 'image/bmp';
      const isLt10MB = file.size / 10240000 <= 1;

      if ((isJPG || isPNG || isGIF || isBMP) && isLt10MB) {
        this.readFile(file, resolve, reject);
      } else {
        reject(null);
      }
    });

  handleFormSubmit = ({
    avatar: {
      file: { originFileObj },
    },
  }) => {
    this.setState({ confirmLoading: true });
    const { updateAvatar, uploadAvatar } = this.props;
    const fd = new FormData();
    fd.append('file', originFileObj);
    if (!this.props.avatarURL) {
      uploadAvatar(fd);
    } else {
      updateAvatar(fd);
    }
  };

  render = () => (
    <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
      <div style={{ height: 150 }}>
        <Field
          name="avatar"
          beforeUpload={this.beforeUpload}
          disabled={this.state.confirmLoading}
          component={AntUpload}
          handleCancel={this.onCancel}
          imageUrl={this.state.imageUrl}
          fileList={this.state.fileList}
          loading={false}
          onChange={this.handleFileChange}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
          previewImage={this.state.previewImage}
          validate={[isRequired, hasFileList]}
        />
      </div>
      <div className="avatar-submit-container">
        <Col span={12}>
          <Tooltip arrowPointAtCenter placement="bottom" title="Cancel">
            <Button
              type="button"
              className="ant-btn ant-btn-danger"
              // eslint-disable-next-line
              onClick={this.props.hideAvatarForm}
              shape="circle"
              icon="close"
            />
          </Tooltip>
        </Col>
        <Col span={12}>
          <Tooltip arrowPointAtCenter placement="bottom" title="Upload">
            <button
              type="submit"
              className={`ant-btn ant-btn-primary ant-btn-circle ant-btn-icon-only ${
                this.props.pristine ? 'disabled' : null
              }`}
              disabled={this.props.submitting}
            >
              <Icon type="upload" />
            </button>
          </Tooltip>
        </Col>
        <div className="clear-fix" />
      </div>
    </form>
  );
}

export default reduxForm({ form: 'AvatarForm' })(AvatarForm);

AvatarForm.propTypes = {
  avatarURL: PropTypes.string,
  updateAvatar: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hideAvatarForm: PropTypes.func.isRequired,
  serverError: PropTypes.string,
  serverErrorMessage: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

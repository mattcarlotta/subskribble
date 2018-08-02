import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Col, Button, Icon } from 'antd';
import { AntUpload } from '../app/formFields/antReduxFormFields';
import { uploadAvatar } from '../../../actions/avatarActions';
import { serverErrorMessage } from '../../../actions/appActions';
import { hasFileList, isRequired } from '../app/formFields/validateFormFields';

class UploadForm extends Component {
	state = {
		confirmLoading: false,
		fileList: [],
		imageUrl: '',
		previewImage: false,
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { hideAvatarForm, serverError, serverMessage } = this.props;
		serverError !== prevProps.serverError && serverError !== undefined && this.handleResetForm();
		serverMessage !== prevProps.serverMessage && serverMessage !== undefined && hideAvatarForm();
	}

	beforeUpload = (file, fileList) => (
		new Promise((resolve, reject) => {
			this.validateFile(file).then(imageUrl => {
				this.setState({ imageUrl });
				resolve(file);
			})
			.catch(({height, width}) => {
				this.props.serverErrorMessage(`Only 10MB@256px/256px (image/jpg,png,bmp,gif) files are accepted! Instead, received a: ${(file.size/1024000).toFixed(2)}MB@${height ? height : '0'}px/${width ? width : 0}px (${file.type}).`)
				reject(file);
			})
		})
	)

	handleCancel = () => this.setState({ previewImage: false })
	handleFileChange = ({ file, fileList }) => {
		file.status = 'done';
		this.setState({ file, fileList })
	}
	handlePreview = () => this.setState({ previewImage: true })
	handleRemove = () => this.setState({ imageUrl: '' })
	handleResetForm = () => this.setState({ confirmLoading: false })

	readFile = (file, resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			let image = new Image();
			image.src = reader.result;
			image.onload = () => {
				(image.height <= 256 || image.width <= 256)
				? resolve(reader.result)
				: reject({ height: image.height, width:image.width})
			}
		});
		reader.readAsDataURL(file);
	}

	validateFile = (file) => (
		new Promise((resolve, reject) => {
			const isJPG = file.type === 'image/jpeg';
			const isPNG = file.type === 'image/png';
			const isGIF = file.type === 'image/gif';
			const isBMP = file.type === 'image/bmp';
			const isLt10MB = file.size / 10240000 <= 1;

			((isJPG || isPNG || isGIF || isBMP) && isLt10MB)
				? this.readFile(file, resolve, reject)
				:	reject(null)
		})
	)

	handleFormSubmit = ({ avatar: {file: {originFileObj} }}) => {
		this.setState({ confirmLoading: true })

		const fd = new FormData();
		fd.append('file', originFileObj);
		this.props.uploadAvatar(fd);
	}

	render = () => (
		<div className="new-form-container">
			<form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
				<div className="upload-box-container">
					<Field
						name="avatar"
						beforeUpload={this.beforeUpload}
						disabled={this.state.confirmLoading}
						component={AntUpload}
						handleCancel={this.handleCancel}
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
						<Button
							type="button"
							className="btn-cancel-warning"
							onClick={this.props.hideAvatarForm}
							shape="circle"
							icon="close"
						/>
					</Col>
					<Col span={12}>
						<button
							type="submit"
							className="ant-btn ant-btn ant-btn-primary ant-btn-submit ant-btn-circle ant-btn-icon-only"
							disabled={this.props.submitting}
						>
							<Icon type="upload" />
						</button>
					</Col>
					<div className="clear-fix" />
				</div>
			</form>
		</div>
	)
}

export default reduxForm({
	form: 'UploadForm',
})(connect(state => ({
	serverError: state.server.error,
	serverMessage: state.server.message
}), { uploadAvatar, serverErrorMessage })(UploadForm));

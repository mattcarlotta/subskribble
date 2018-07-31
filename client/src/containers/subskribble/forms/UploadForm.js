import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
// import { message } from 'antd';
import { AntUpload } from '../app/formFields/antReduxFormFields';
import { uploadAvatar } from '../../../actions/avatarActions';
import { serverErrorMessage } from '../../../actions/appActions';
import { hasFileList, isRequired } from '../app/formFields/validateFormFields';

class UploadForm extends Component {
	state = {
		confirmLoading: false,
		fileList: [],
		imageUrl: '',
		previewImage: false
	};

	// componentDidMount = () => {
	// }
	componentDidUpdate = (prevProps, prevState) => {
		const { serverError } = this.props;
		serverError !== prevProps.serverError && serverError !== undefined && this.setState({ confirmLoading: false });
	}

	// beforeUpload = (file, fileList) => {
	//   const isJPG = file.type === 'image/jpeg';
	//   const isPNG = file.type === 'image/png';
	//   const isLt2MB = file.size / 2048000 <= 1;
	//
	//   return new Promise((resolve, reject) => {
	//     if ((isJPG || isPNG) && isLt2MB) {
	//       this.getBase64(file, imageUrl => this.setState({ imageUrl }));
	//       resolve();
	//     } else {
	//       this.props.serverErrorMessage(`Only 2MB jpg/png files are accepted! Instead, received a ${(file.size/1024000).toFixed(1)}MB (${file.type}).`)
	//       reject(file);
	//     }
	//   });
	// }

	beforeUpload = (file, fileList) => {
		const isJPG = file.type === 'image/jpeg';
		const isPNG = file.type === 'image/png';
		const isLt2MB = file.size / 2048000 <= 1;

		if ((isJPG || isPNG) && isLt2MB) {
			this.getBase64(file, imageUrl => this.setState({ imageUrl }))
			return false
		}

		return new Promise((resolve, reject) => {
			this.props.serverErrorMessage(`Only 2MB jpg/png files are accepted! Instead, received a ${(file.size/1024000).toFixed(1)}MB (${file.type}).`)
			reject(file);
		});
	}

	getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => this.setState({ imageUrl: reader.result }));
		reader.readAsDataURL(img);
	}

	handleCancel = () => this.setState({ previewImage: false })
	handlePreview = () => this.setState({ previewImage: true })
	handleRemove = () => this.setState({ imageUrl: '' })

	handleFormSubmit = ({ avatar }) => {
		// this.setState({ confirmLoading: true })
		console.log('avatar', avatar);
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
						loading={false}
						onPreview={this.handlePreview}
						onRemove={this.handleRemove}
						previewImage={this.state.previewImage}
						validate={[isRequired, hasFileList]}
					/>
				</div>
				<button
					type="submit"
					className="ant-btn ant-btn-primary"
					style={{ width: 128 }}
					disabled={this.props.submitting}
					>
						Upload
				</button>
			</form>
		</div>
	)
}

export default reduxForm({
	form: 'UploadForm',
})(connect(state => ({ serverError: state.server.error }), { uploadAvatar, serverErrorMessage })(UploadForm));

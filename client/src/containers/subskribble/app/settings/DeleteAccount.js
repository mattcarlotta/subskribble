import React from 'react';
import { connect } from 'react-redux';
import DeleteAccountForm from '../../forms/DeleteAccountForm';
import { deleteUserAccount } from '../../../../actions/authActions';
import PageContainer from '../../../../components/subskribble/app/panels/pageContainer';

const DeleteAccount = props => (
  <PageContainer>
    <div className="settings-container">
      <h2>Delete Account</h2>
      <hr/>
      <h4 className="title">Delete Your Subskribble Account</h4>
      <p className="subdescription">
        We're sorry to see you go so soon, {props.firstName} {props.lastName}. Before leaving, please let us know how we can improve our services.
      </p>
      <DeleteAccountForm {...props} />
    </div>
  </PageContainer>
)

export default connect(state => ({
  company: state.auth.company,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  loggedinUser: state.auth.loggedinUser
}), { deleteUserAccount})(DeleteAccount)

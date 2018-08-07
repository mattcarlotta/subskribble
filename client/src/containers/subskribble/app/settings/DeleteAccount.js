import React from 'react';
import { connect } from 'react-redux';
import DeleteAccountForm from '../../forms/DeleteAccountForm';
import { deleteUserAccount } from '../../../../actions/authActions';
import PageContainer from '../../../../components/subskribble/app/panels/pageContainer';

const DeleteAccount = props => (
  <PageContainer>
    <DeleteAccountForm {...props} />
  </PageContainer>
)

export default connect(state => ({
  company: state.auth.company,
  serverError: state.server.error,
}), { deleteUserAccount})(DeleteAccount)

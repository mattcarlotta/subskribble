import React from 'react';
import { connect } from 'react-redux';
import DeleteAccountForm from '../../../forms/DeleteAccountForm/DeleteAccountForm.js';
import { deleteUserAccount } from '../../../../actions/authActions.js';
import PageContainer from '../../../../components/app/panels/PageContainer/pageContainer.js';
import { settingsContainer, title, subdescription } from './deleteAccount.scss';

export const DeleteAccount = props => (
  <PageContainer>
    <div className={settingsContainer}>
      <h2>Delete Account</h2>
      <hr />
      <h4 className={title}>Delete Your Subskribble Account</h4>
      <p className={subdescription}>
        {`We're sorry to see you go so soon, ${props.firstName} ${
          props.lastName
        }.
        Before leaving, please let us know how we can improve our services.`}
      </p>
      <DeleteAccountForm {...props} />
    </div>
  </PageContainer>
);

export default connect(
  state => ({
    company: state.auth.company,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    loggedinUser: state.auth.loggedinUser,
  }),
  { deleteUserAccount },
)(DeleteAccount);

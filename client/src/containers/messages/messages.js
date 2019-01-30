import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messageActions';
import TABLEHEADERS from '../../components/messages/layouts/Headers/headers.js';
import BasicPanelLoader from '../../components/app/panels/BasicPanelLoader/BasicPanelLoader.js';

const Messages = props => (
  <BasicPanelLoader
    panelType="basic"
    SELECTFIELD
    TABLEHEADERS={TABLEHEADERS}
    buttonIcon="markunread_mailbox"
    buttonPushLocation="messages/create"
    cardTitle="Messages"
    tipTitle="Send Messages"
    TAB="Messages"
    {...props}
  />
);

export default connect(
  state => ({
    serverError: state.server.error,
    serverMessage: state.server.message,
    ...state.messages,
  }),
  { ...actions },
)(Messages);

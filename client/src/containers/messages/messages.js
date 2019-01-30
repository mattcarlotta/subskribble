import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messageActions';
import TABLEHEADERS from '../../components/messages/layouts/Headers/headers.js';
import BasicPanelLoader from '../../components/app/panels/BasicPanelLoader/BasicPanelLoader.js';

const Messages = props => (
  <BasicPanelLoader
    {...props}
    SELECTFIELD
    TABLEHEADERS={TABLEHEADERS}
    buttonIcon="markunread_mailbox"
    buttonPushLocation="messages/create"
    cardTitle="Messages"
    tipTitle="Send Messages"
    TAB="Messages"
  />
);

export default connect(
  state => ({ ...state.server, ...state.messages }),
  { ...actions },
)(Messages);

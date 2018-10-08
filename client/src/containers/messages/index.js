import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/messageActions';
import CARDS from '../../components/messages/layouts/panelCards';
import BasicPanelLoader from '../../components/app/panels/BasicPanelLoader';
import MessagePanel from '../../components/messages/panels/messagePanels';

const Templates = props => (
  <BasicPanelLoader
    {...props}
    buttonIcon="markunread_mailbox"
    buttonPushLocation="messages/create"
    cardTitle="Messages"
    CARDS={CARDS}
    className="messages-container"
    Panel={MessagePanel}
    tipTitle="Send Messages"
  />
);

export default connect(
  state => ({ serverMessage: state.server.message, ...state.messages }),
  { ...actions },
)(Templates);

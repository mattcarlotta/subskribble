import React from 'react';
import { CookiesProvider } from 'react-cookie';
import OnLoadAuth from './OnLoadAuth';
import RenderMessages from '../messages/renderMessages';

export default props => (
  <CookiesProvider>
    <OnLoadAuth {...props} />
    <RenderMessages />
  </CookiesProvider>
)

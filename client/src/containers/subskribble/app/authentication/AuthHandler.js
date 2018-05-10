import React from 'react';
import { CookiesProvider } from 'react-cookie';
import RequireAuth from './RequireAuth';
import RenderMessages from '../messages/renderMessages';

export default props => (
  <CookiesProvider>
    <RequireAuth {...props} />
    <RenderMessages />
  </CookiesProvider>
)

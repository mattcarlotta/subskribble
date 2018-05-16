import React from 'react';
import { CookiesProvider } from 'react-cookie';
import RenderMessages from '../../containers/subskribble/app/messages/renderMessages';

export default ({children}) => (
  <CookiesProvider>
    {children}
    <RenderMessages />
  </CookiesProvider>
)

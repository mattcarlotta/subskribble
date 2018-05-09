import React from 'react';
import { CookiesProvider } from 'react-cookie';
import OnLoadAuth from './OnLoadAuth';

export default props => (
  <CookiesProvider>
    <OnLoadAuth {...props} />
  </CookiesProvider>
)

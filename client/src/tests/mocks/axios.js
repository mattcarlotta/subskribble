import MockAdapter from 'axios-mock-adapter';
import { app, avatarAPI } from 'utils';

const mockApp = new MockAdapter(app);
const mockAPI = new MockAdapter(avatarAPI);

export { mockApp, mockAPI };

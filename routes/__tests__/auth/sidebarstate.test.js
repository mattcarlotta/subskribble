import app from 'utils/setup';
import { saveSidebarState } from 'controllers/auth';
import { requireAuth } from 'strategies';

jest.mock('controllers/auth', () => ({
  ...require.requireActual('controllers/auth'),
  saveSidebarState: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Save SideBar State Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    saveSidebarState.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .put('/api/save-sidebar-state?collapseSideNav=true')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the saveSidebarState controller', async () => {
    await app()
      .put('/api/save-sidebar-state?collapseSideNav=true')
      .then(() => {
        expect(saveSidebarState).toHaveBeenCalledTimes(1);
      });
  });
});

import app from 'utils/setup';
import { saveSidebarState } from 'controllers/auth';
import { requireAuth } from 'strategies';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  saveSidebarState: jest.fn(),
}));

jest.mock('../../../services/strategies/requireAuth', () => jest.fn());

describe('Save SideBar State Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    saveSidebarState.mockClear();
  });

  it('routes initial requests to authentication middleware', () => {
    app()
      .put('/api/save-sidebar-state?collapseSideNav=true')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the saveSidebarState controller', () => {
    app()
      .put('/api/save-sidebar-state?collapseSideNav=true')
      .then(() => {
        expect(saveSidebarState).toHaveBeenCalledTimes(1);
      });
  });
});

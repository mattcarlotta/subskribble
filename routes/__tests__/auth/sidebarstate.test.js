const {
  badCredentials,
  missingSidebarState,
} = require('../../../shared/authErrors');

const setSidebarState = (cookie, state) => request(app)
  .put(`/api/save-sidebar-state?collapseSideNav=${state}`)
  .set('Cookie', cookie)
  .then((res) => {
    expect(res.statusCode).toEqual(201);
    expect(res.body.collapseSideNav).toBe(state);
  });

describe('Sidebar State', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie('betatester@subskribble.com', 'password123');
  });

  afterAll(async () => {
    await setSidebarState(cookie, false);
  });

  it('handles invalid sidebar save state requests', async () => {
    // not logged in
    await request(app)
      .put('/api/save-sidebar-state?')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // missing state query
    await request(app)
      .put('/api/save-sidebar-state?')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingSidebarState);
      });
  });

  it('handles valid sidebar save state requests', async () => {
    await setSidebarState(cookie, true);
  });
});
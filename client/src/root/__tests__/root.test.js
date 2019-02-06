import RequireAuth from '../../containers/app/auth/RequireAuth/RequireAuth';

describe('App', () => {
  const wrapper = mount(
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={RequireAuth} />
        </Router>
      </Provider>
    </LocaleProvider>,
  );

  it('renders without errors', () => {
    const App = wrapper.find('.app');
    expect(App).toHaveLength(1);
  });
});

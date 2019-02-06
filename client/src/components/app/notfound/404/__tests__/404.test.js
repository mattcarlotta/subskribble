import NotFound from '../404.js';

const wrapper = shallow(<NotFound />);
describe('404 Not Found', () => {
  it('renders without errors', () => {
    const notfoundComponent = wrapper.find('div.notfoundContainer');
    expect(notfoundComponent).toHaveLength(1);
  });

  it('goes back to the previous page when button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleGoBack');
    wrapper.instance().forceUpdate();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
});

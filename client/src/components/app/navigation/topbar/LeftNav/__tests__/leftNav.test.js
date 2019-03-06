import LeftNav from '../leftNav.js';

const handleMenuToggle = jest.fn();
const initialProps = {
  collapseSideNav: false,
  handleMenuToggle,
};

const wrapper = shallow(<LeftNav {...initialProps} />);

describe('Left Side Navigation', () => {
  it('renders without errors', () => {
    const leftNavComponent = wrapper.find('div.leftNav');
    expect(leftNavComponent).toHaveLength(1);
  });

  it('pushes to the landing page when the logo has been clicked', () => {
    const logoButton = wrapper.find('Button');
    logoButton.simulate('click');
    expect(handleMenuToggle.mock.calls).toHaveLength(1);
  });

  it('prevents the logo from being focused', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handlePreventButtonFocus');
    wrapper.instance().forceUpdate();
    const logoButton = wrapper.find('Button');
    logoButton.simulate('focus', { target: { blur: () => null } });
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
});

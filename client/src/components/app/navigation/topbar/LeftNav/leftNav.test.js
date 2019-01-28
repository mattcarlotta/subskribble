import { checkProps, setup } from '../../../../../tests/utils';
import LeftNav from './leftNav.js';

const handleMenuToggle = jest.fn();
const initialProps = {
  collapseSideNav: false,
  handleMenuToggle,
};

const wrapper = setup(LeftNav, initialProps, null);

describe('Left Side Navigation', () => {
  it('renders without errors', () => {
    const leftNavComponent = wrapper.find('div.leftNav');
    expect(leftNavComponent).toHaveLength(1);
  });

  it('does not throw PropType warnings', () => {
    checkProps(LeftNav, initialProps);
  });

  it('calls handleMenuToggle when the logo has been clicked', () => {
    const logoButton = wrapper.find('Button');
    logoButton.simulate('click');
    expect(handleMenuToggle.mock.calls).toHaveLength(1);
  });

  it('calls handlePreventButtonFocus when the logo attempts to be focused', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handlePreventButtonFocus');
    wrapper.instance().forceUpdate();
    const logoButton = wrapper.find('Button');
    logoButton.simulate('focus', { target: { blur: () => null } });
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
});

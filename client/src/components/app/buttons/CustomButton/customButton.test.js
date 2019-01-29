import { checkProps, setup } from '../../../../tests/utils';
import CustomButton from './customButton.js';

const initialProps = {
  buttonIcon: 'test',
  buttonPushLocation: '/test',
  className: 'test',
  style: {},
  tipTitle: 'Test Button',
};

const fakeOnClickAction = jest.fn();
let wrapper = setup(CustomButton, initialProps, null); // set wrapper with initialState
let customButtonComponent = wrapper.find('Button'); // get custom button component

describe('Custom Button', () => {
  it('renders without errors', () =>
    expect(customButtonComponent).toHaveLength(1));

  it('does not not throw PropType warnings', () =>
    checkProps(CustomButton, initialProps));

  it('pushes to a new page if onClickAction is missing', () => {
    const spy = jest.spyOn(wrapper.instance(), 'pushToLocation');
    wrapper.instance().forceUpdate();
    customButtonComponent = wrapper.find('Button'); // get custom button component
    customButtonComponent.simulate('click');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('calls supplied onClickAction function', () => {
    wrapper = setup(
      CustomButton,
      { ...initialProps, onClickAction: fakeOnClickAction },
      null,
    ); // set wrapper with initialState
    customButtonComponent = wrapper.find('Button'); // get custom button component
    customButtonComponent.simulate('click');
    expect(fakeOnClickAction).toHaveBeenCalled();
  });
});

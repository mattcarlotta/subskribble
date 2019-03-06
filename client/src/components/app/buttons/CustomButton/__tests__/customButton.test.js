import CustomButton from '../customButton.js';

const initialProps = {
  buttonIcon: 'test',
  buttonPushLocation: '/test',
  className: 'test',
  style: {},
  tipTitle: 'Test Button',
};

const onClickAction = jest.fn();

describe('Custom Button', () => {
  let wrapper;
  let customButtonComponent;
  beforeEach(() => {
    wrapper = shallow(<CustomButton {...initialProps} />);
    customButtonComponent = wrapper.find('Button');
  });

  it('renders without errors', () =>
    expect(customButtonComponent).toHaveLength(1));

  it('pushes to a new page if onClickAction is missing', () => {
    const spy = jest.spyOn(wrapper.instance(), 'pushToLocation');
    wrapper.instance().forceUpdate();

    customButtonComponent = wrapper.find('Button');
    customButtonComponent.simulate('click');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('calls supplied onClickAction function', () => {
    wrapper.setProps({ onClickAction });

    customButtonComponent = wrapper.find('Button');
    customButtonComponent.simulate('click');
    expect(onClickAction).toHaveBeenCalled();
  });
});

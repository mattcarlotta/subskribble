import CurrentAvatar from '../currentAvatar.js';

const deleteAvatar = jest.fn();
const showAvatarForm = jest.fn();

const initialProps = {
  avatarURL: '',
  deleteAvatar,
  showAvatarForm,
};

const wrapper = shallow(<CurrentAvatar {...initialProps} />);
describe('CurrentAvatar', () => {
  it('renders without errors', () => {
    const currentAvatarComponent = wrapper.find('div.avatarContainer');
    expect(currentAvatarComponent).toHaveLength(1);
  });

  it('does not throw PropType warnings', () => {
    checkProps(CurrentAvatar, initialProps);
  });

  it('changes to AvatarForm when clicking on the change button', () => {
    wrapper.find('Button.change').simulate('click');
    expect(showAvatarForm).toHaveBeenCalled();
  });

  it('deletes the current avatar only if one is present', () => {
    wrapper.setProps({ avatarURL: 'http://fakehost.com/123.png' });
    wrapper.find('Button.delete').simulate('click');
    expect(deleteAvatar).toHaveBeenCalled();
  });
});

import { AvatarForm } from '../AvatarForm.js';
import { createFile } from '../__mocks__/Avatar.mocks.js';

const updateAvatar = jest.fn();
const uploadAvatar = jest.fn();
const hideAvatarForm = jest.fn();
const handleSubmit = jest.fn();
const serverErrorMessage = jest.fn();

const initialProps = {
  avatarURL: '',
  updateAvatar,
  uploadAvatar,
  handleSubmit,
  hideAvatarForm,
  serverError: '',
  serverErrorMessage,
  pristine: true,
  submitting: false,
};

const initialState = {
  confirmLoading: false,
  fileList: [],
  imageUrl: '',
  previewImage: false,
};

const originFileObj = createFile('cats.gif', 1234, 'image/gif');
const fd = new FormData();
fd.append('file', originFileObj);
const formProps = { avatar: { file: { originFileObj } } };
const avatarURL = 'http://example.com/uploads/test.png';

describe('Avatar Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AvatarForm {...initialProps} />, initialState);
  });

  it('renders without errors', () => {
    expect(wrapper.find('form.avatar-form')).toHaveLength(1);
  });

  it('hides the form if the cancel button is clicked', () => {
    wrapper.find('Button.cancel').simulate('click');
    expect(hideAvatarForm).toHaveBeenCalled();
  });

  it('uploads a new avatar', () => {
    wrapper.instance().handleFormSubmit(formProps);
    wrapper.update();
    expect(wrapper.state('confirmLoading')).toBeTruthy();
    expect(uploadAvatar).toHaveBeenCalledWith(fd);
  });

  it('updates the avatar if one already exists', () => {
    wrapper.setProps({ avatarURL });
    wrapper.instance().handleFormSubmit(formProps);
    wrapper.update();
    expect(wrapper.state('confirmLoading')).toBeTruthy();
    expect(updateAvatar).toHaveBeenCalledWith(fd);
  });
});

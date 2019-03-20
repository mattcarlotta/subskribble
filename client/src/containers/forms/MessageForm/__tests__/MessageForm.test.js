import map from 'lodash/map';
import { MessageForm } from '../MessageForm.js';

const activetemplates = ['Test Template 1', 'Test Template 2'];
const handleGoBack = jest.fn();
const handleSubmit = jest.fn();
const fetchAllActiveTemplates = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve({ data: { activetemplates } });
      } else {
        reject('You must create a plan first!');
      }
    }),
);
const sendMessageToSubs = jest.fn();
const showButtonLoading = jest.fn();

const initialProps = {
  company: 'Test Company',
  fetchAllActiveTemplates: () => fetchAllActiveTemplates(true),
  handleGoBack,
  handleSubmit,
  selectedTemplate: '',
  sendMessageToSubs,
  showButtonLoading,
  pristine: true,
  submitting: false,
};

const initialState = {
  availableTemplates: [],
  isLoading: true,
  previewTemplate: [],
  selectTemplateOptions: [],
};

const formProps = {
  template: 'Test Template 1',
};

describe('Message Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MessageForm {...initialProps} />, initialState);
  });

  it('initially displays a spinner', () => {
    expect(wrapper.find('Spinner')).toHaveLength(1);
  });

  describe('Form Loaded', () => {
    beforeEach(() => {
      wrapper.instance().componentDidMount();
      wrapper.update();
    });

    it('renders without errors', () => {
      expect(fetchAllActiveTemplates).toHaveBeenCalled();
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.state('availableTemplates')).toEqual(activetemplates);
      expect(wrapper.state('selectTemplateOptions')).toEqual(
        map(activetemplates, ({ templatename }) => templatename),
      );
      expect(wrapper.find('div.formBoxContainer')).toHaveLength(1);
    });

    it('sends a templated message to a list of subscribers', () => {
      wrapper.instance().handleFormSubmit(formProps);
      wrapper.update();
      expect(showButtonLoading).toHaveBeenCalled();
      expect(sendMessageToSubs).toHaveBeenCalledWith(formProps);
    });
  });
});

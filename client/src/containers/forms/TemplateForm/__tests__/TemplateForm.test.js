import map from 'lodash/map';
import { TemplateForm } from '../TemplateForm.js';

const activeplans = [
  {
    planname: 'Test Plan 1',
  },
  {
    planname: 'Test Plan 2',
  },
];

const addNewTemplate = jest.fn();
const editTemplate = jest.fn();
const fetchAllActivePlans = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve({ data: { activeplans } });
      } else {
        reject('You must create a plan first!');
      }
    }),
);

const plans = ['Test Plan 1', 'Test Plan 2'];

const data = {
  fromsender: 'betatester@subskribble.com',
  id: '1234-1234-1234-1234',
  key: 4,
  message: '<span>Mollit consectetur ea ut duis quis qui labor',
  plans,
  status: 'active',
  subject: 'Test Template Subject',
  templatename: 'Test Template',
  uniquetemplatename: 'test-template',
  userid: '88',
};

const fetchTemplate = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve({ data });
      } else {
        reject('You must create a plan first!');
      }
    }),
);

const handleGoBack = jest.fn();
const initialize = jest.fn();
const showButtonLoading = jest.fn();
const handleSubmit = jest.fn();

const initialProps = {
  addNewTemplate,
  company: '',
  confirmLoading: false,
  editTemplate,
  fetchAllActivePlans: () => fetchAllActivePlans(true),
  fetchTemplate: () => fetchTemplate(true),
  handleGoBack,
  handleSubmit,
  initialize,
  location: {
    pathname: '/',
    query: {
      id: '',
    },
  },
  message: '',
  fromsender: '',
  pristine: true,
  showButtonLoading,
  submitting: false,
  subject: '',
};

const initialState = {
  isLoading: true,
  selectOptions: [],
};

const formProps = {
  fromsender: 'betatester@subskribble.com',
  id: '1234-1234-1234-1234',
  key: 4,
  message: '<span>Mollit consectetur ea ut duis quis qui labor',
  plans,
  status: 'active',
  subject: 'Test Template Subject',
  templatename: 'Test Template',
  uniquetemplatename: 'test-template',
  userid: '88',
};

describe('Template Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TemplateForm {...initialProps} />, initialState);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('initially displays a spinner', () => {
    expect(wrapper.find('Spinner')).toHaveLength(1);
  });

  it('renders without errors', () => {
    wrapper.setState({ isLoading: false, selectOptions: plans });
    wrapper.update();
    expect(wrapper.find('div.formBoxContainer')).toHaveLength(1);
  });

  it('fetches all active plans for creating a new template and handles form submit', () => {
    wrapper.instance().componentDidMount();
    wrapper.instance().handleFormSubmit(formProps);
    wrapper.update();
    setTimeout(() => {
      expect(fetchAllActivePlans).toHaveBeenCalled();
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.state('selectOptions')).toEqual(
        map(activeplans, ({ planname }) => planname),
      );
      expect(showButtonLoading).toHaveBeenCalled();
      expect(addNewTemplate).toHaveBeenCalledWith(formProps);
    }, 1000);
  });

  it('fetches a template for editing if query id is present and handles form submit', () => {
    const id = '1234-1234-1234-1234';
    wrapper.setProps({
      location: {
        pathname: '/',
        query: {
          id,
        },
      },
    });
    wrapper.instance().componentDidMount();
    wrapper.instance().handleFormSubmit(formProps);
    wrapper.update();
    setTimeout(() => {
      expect(fetchTemplate).toHaveBeenCalled();
      expect(wrapper.state('selectedPlans')).toEqual(plans);
      expect(initialize).toHaveBeenCalledWith(data);
      expect(fetchAllActivePlans).toHaveBeenCalled();
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.state('selectOptions')).toEqual(
        map(activeplans, ({ planname }) => planname),
      );
      expect(showButtonLoading).toHaveBeenCalled();
      expect(editTemplate).toHaveBeenCalledWith(id, formProps);
    }, 1000);
  });

  it('goes to back to previous page if an API call fails', () => {
    wrapper.setProps({ fetchAllActivePlans: () => fetchAllActivePlans(false) });
    wrapper.instance().componentDidMount();
    wrapper.update();
    setTimeout(() => {
      expect(handleGoBack).toHaveBeenCalled();
    }, 1000);
  });
});

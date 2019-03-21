import { PlanForm } from '../PlansForm.js';

const data = {
  amount: '1.99',
  billevery: 'Weekly',
  description: 'Test Subscription',
  planname: 'Test Plan',
  setupfee: null,
  trialperiod: null,
};

const formProps = data;

const fetchPlan = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve({ data });
      } else {
        reject('You must create a plan first!');
      }
    }),
);

const initialize = jest.fn();
const addNewPlan = jest.fn();
const editPlan = jest.fn();
const handleGoBack = jest.fn();
const handleSubmit = jest.fn();
const showButtonLoading = jest.fn();

const initialProps = {
  location: {
    query: {
      id: '',
    },
  },
  fetchPlan: () => fetchPlan('success'),
  initialize,
  handleGoBack,
  addNewPlan,
  editPlan,
  handleSubmit,
  pristine: true,
  submitting: false,
  confirmLoading: false,
  showButtonLoading,
};

const initialState = {
  billEveryDefault: 'Weekly',
  isEditing: false,
  isLoading: true,
  trialPeriodDefault: undefined,
};

describe('Plans Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PlanForm {...initialProps} />, initialState);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('initially renders a spinner', () => {
    expect(wrapper.find('Spinner')).toHaveLength(1);
  });

  it('renders without errors', () => {
    wrapper.setState({ isLoading: false });
    wrapper.update();

    setTimeout(() => {
      expect(wrapper.find('div.formBoxContainer')).toHaveLength(1);
    }, 1000);
  });

  it('renders a Create Plan form if query id is missing and adds a new plan on form submit', () => {
    wrapper.instance().componentDidMount();
    wrapper.instance().handleFormSubmit(formProps);
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(showButtonLoading).toHaveBeenCalled();
      expect(addNewPlan).toHaveBeenCalledWith(formProps);
    }, 1000);
  });

  it('fetches a plan for editing if query id is present and handles form submit', () => {
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
      expect(fetchPlan).toHaveBeenCalled();
      expect(wrapper.state('isEditing')).toBeTruthy();
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.state('billEveryDefault')).toBe(data.billevery);
      expect(wrapper.state('trialPeriodDefault')).toBeUndefined();
      expect(initialize).toHaveBeenCalledWith(data);
      expect(showButtonLoading).toHaveBeenCalled();
      expect(editPlan).toHaveBeenCalledWith(id, formProps);
    }, 1000);
  });

  it('goes to back to previous page if edit plan API call fails', () => {
    const id = '1234-1234-1234-1234';
    wrapper.setProps({
      location: {
        pathname: '/',
        query: {
          id,
        },
      },
      fetchPlan: () => fetchPlan(false),
    });
    wrapper.instance().componentDidMount();
    wrapper.update();
    setTimeout(() => {
      expect(handleGoBack).toHaveBeenCalled();
    }, 1000);
  });
});

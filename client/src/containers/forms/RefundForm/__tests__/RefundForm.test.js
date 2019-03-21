import { RefundForm } from '../RefundForm.js';

const handleGoBack = jest.fn();
const handleSubmit = jest.fn();
const initialize = jest.fn();
const refundAction = jest.fn();
const showButtonLoading = jest.fn();

const data = {
  email: 'test@test.com',
  planname: 'Test Plan',
  processor: 'Paypal',
  subscriber: 'Beta Tester',
};

const formProps = {
  ...data,
  transactiontype: 'refund',
};

const fetchTransaction = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve({ data });
      } else {
        reject('Unable to locate transaction!');
      }
    }),
);

const initialProps = {
  confirmLoading: false,
  fetchTransaction: () => fetchTransaction('success'),
  handleGoBack,
  handleSubmit,
  initialize,
  location: {
    pathname: '/',
    query: {
      id: '',
    },
  },
  pristine: true,
  refundAction,
  showButtonLoading,
  submitting: false,
};

const initialState = {
  isLoading: true,
};

describe('Refund Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RefundForm {...initialProps} />, initialState);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('initially displays a spinner', () => {
    expect(wrapper.find('Spinner')).toHaveLength(1);
  });

  it('renders without errors', () => {
    wrapper.setState({ isLoading: false });
    wrapper.update();
    expect(wrapper.find('div.formBoxContainer')).toHaveLength(1);
  });

  it('fetches a transaction for refunding if query id is present and handles form submit', () => {
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
      expect(fetchTransaction).toHaveBeenCalled();
      expect(initialize).toHaveBeenCalledWith({
        ...data,
        transactiontype: 'Refund',
      });
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(showButtonLoading).toHaveBeenCalled();
      expect(refundAction).toHaveBeenCalledWith(formProps);
    }, 1000);
  });

  it('goes to back to previous page if an API call fails', () => {
    const id = '1234-1234-1234-1234';
    wrapper.setProps({
      location: {
        pathname: '/',
        query: {
          id,
        },
      },
      fetchTransaction: () => fetchTransaction(false),
    });
    wrapper.instance().componentDidMount();
    wrapper.update();
    setTimeout(() => {
      expect(handleGoBack).toHaveBeenCalled();
    }, 1000);
  });
});

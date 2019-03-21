import map from 'lodash/map';
import { PromoForm } from '../PromosForm.js';

const activeplans = [
  {
    planname: 'Test Plan 1',
  },
  {
    planname: 'Test Plan 2',
  },
];

const plans = ['Test Plan 1', 'Test Plan 2'];

const data = {
  amount: 100,
  discounttype: '%',
  enddate: '2019-04-30T21:06:40.975Z',
  id: '1234-1234-1234-1234',
  key: 12,
  maxusage: 2147483647,
  plans,
  promocode: 'FREETRIAL',
  startdate: '2018-12-01T22:06:40.976Z',
  status: 'active',
  totalusage: 8,
  userid: '88',
};

const formProps = {
  amount: 100,
  discounttype: '%',
  dateStamps: [data.startdate, data.enddate],
  id: '1234-1234-1234-1234',
  key: 12,
  maxusage: 2147483647,
  plans,
  promocode: 'FREETRIAL',
  status: 'active',
  totalusage: 8,
  userid: '88',
};

const addNewPromo = jest.fn();
const editPromo = jest.fn();
const fetchPromo = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve({ data });
      } else {
        reject('Unable to retrieve plan!');
      }
    }),
);

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

const handleGoBack = jest.fn();
const initialize = jest.fn();
const showButtonLoading = jest.fn();
const handleSubmit = jest.fn();

const initialProps = {
  addNewPromo,
  confirmLoading: false,
  editPromo,
  fetchAllActivePlans: () => fetchAllActivePlans(true),
  fetchPromo: () => fetchPromo(true),
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
  showButtonLoading,
  submitting: false,
};

const initialState = {
  isLoading: true,
  selectOptions: [],
};

describe('Promos Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PromoForm {...initialProps} />, initialState);
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

  it('fetches all active plans for creating a new promotional and handles form submit', () => {
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
      expect(addNewPromo).toHaveBeenCalledWith(formProps);
    }, 1000);
  });

  it('fetches a promo for editing if query id is present and handles form submit', () => {
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
      expect(fetchPromo).toHaveBeenCalled();
      expect(wrapper.state('selectedPlans')).toEqual(plans);
      expect(wrapper.state('discounttype')).toEqual(data.discountType);
      expect(wrapper.state('selectedPlans')).toEqual(data.plans);
      expect(initialize).toHaveBeenCalled();
      expect(fetchAllActivePlans).toHaveBeenCalled();
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.state('selectOptions')).toEqual(
        map(activeplans, ({ planname }) => planname),
      );
      expect(showButtonLoading).toHaveBeenCalled();
      expect(editPromo).toHaveBeenCalledWith(id, formProps);
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
      fetchPromo: () => fetchPromo(false),
    });
    wrapper.instance().componentDidMount();
    wrapper.update();
    setTimeout(() => {
      expect(handleGoBack).toHaveBeenCalled();
    }, 1000);
  });
});

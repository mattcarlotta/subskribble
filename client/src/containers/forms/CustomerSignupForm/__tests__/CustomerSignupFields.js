/* global shallow */
import { CustomerPlanSignup } from '../CustomerSignupForm.js';
import { getCustomerFormFields } from '../customerSignupFields.js';

const activeplans = ['Test Plan', 'Test Plan 2'];

const handleGoBack = jest.fn();
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
const subRegisterToPlan = jest.fn();
const showButtonLoading = jest.fn();

const initialProps = {
  handleGoBack,
  fetchAllActivePlans: () => fetchAllActivePlans(true),
  subRegisterToPlan,
  confirmLoading: false,
  showButtonLoading,
};

const initialState = {
  formFields: getCustomerFormFields(),
  isLoading: true,
  stepIndex: 0,
  visited: [],
  plans: [],
  wasReviewed: false,
};

const formProps = {
  billingAddress: 'Test Address',
  billingCity: 'Test City',
  billingState: 'CA',
  billingUnit: undefined,
  billingZip: '55555',
  contactAddress: 'Test Address',
  contactCity: 'Test City',
  contactEmail: 'test@example.com',
  contactFirstName: 'Beta',
  contactLastName: 'Tester',
  contactPhone: '(555) 555-5555',
  contactState: 'CA',
  contactZip: '95124',
  creditCard: '1111-1111-1111-1111',
  creditCardCVV: '111',
  creditCardExpMonth: '11',
  creditCardExpYear: '1111',
  sameBillingAddress: true,
  selectedPlan: 'Test Plan',
};

describe('Customer Plan Signup Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CustomerPlanSignup {...initialProps} />, initialState);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('initially grabs active plans before showing form', () => {
    wrapper.instance().componentDidMount();
    wrapper.update();
    expect(fetchAllActivePlans).toHaveBeenCalled();
    expect(wrapper.find('div.customerSignupBG')).toHaveLength(0);
  });

  it("goes back to the previous page if there aren't any active plans", () => {
    wrapper.setProps({ fetchAllActivePlans: () => fetchAllActivePlans(false) });
    wrapper.instance().componentDidMount();
    setTimeout(() => {
      wrapper.update();
      expect(handleGoBack).toHaveBeenCalled();
    }, 1000);
  });

  describe('Form Loaded', () => {
    beforeEach(() => {
      wrapper.instance().componentDidMount();
      wrapper.update();
    });

    it('renders without errors', () => {
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.state('plans')).toEqual(activeplans);
      expect(wrapper.find('div.customerSignupBG')).toHaveLength(1);
    });

    it('signs up the user once the forms have been filled out', () => {
      wrapper.instance().handleFormSave(formProps);
      wrapper.update();
      expect(showButtonLoading).toHaveBeenCalled();
      expect(subRegisterToPlan).toHaveBeenCalledWith(formProps);
    });
  });
});

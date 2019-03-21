import {
  BILLINGADDRESSFIELDS,
  CONTACTFIELD,
  CREDITCARDFIELDS,
} from 'containers/forms/CustomerSignupForm/customerSignupFields.js';
import { RegisterPlanForm } from '../RegisterPlanForm.js';

const onClickBack = jest.fn();
const handleSubmit = jest.fn();
const editStep = jest.fn();

const mainTitle = [
  <span key="Contact-Information">
    Please fill out the information below and click <strong>next</strong> to
    continue.
  </span>,
];

const initialProps = {
  BILLINGADDRESSFIELDS,
  confirmLoading: false,
  CONTACTFIELD,
  CREDITCARDFIELDS,
  handleSubmit,
  editStep,
  finished: false,
  mainTitle,
  onClickBack,
  pristine: true,
  submitting: false,
  plans: ['Test Plan'],
  showContactInfo: false,
  showPlans: false,
};

describe('Register To Plan Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RegisterPlanForm {...initialProps} />);
  });

  it('renders without errors', () => {
    expect(wrapper.find('div.formContainer')).toHaveLength(1);
  });
});

import { ApplyPromotional } from '../applyPromotionalForm.js';

const applyPromo = jest.fn();
const resetPromo = jest.fn();

const appliedPromoCode = {
  amount: 100,
  discounttype: '%',
  enddate: '2019-04-30T21:06:40.975Z',
  id: '1234-1234-1234-1234',
  key: 88,
  maxusage: 100,
  plans: ['Test Plan'],
  promocode: 'FREETRIAL',
  startdate: '2018-12-01T22:06:40.976Z',
  status: 'active',
  totalusage: 1,
  userid: '88',
};

const initialProps = {
  adjustedPrice: '9.99',
  appliedPromoCode: {},
  applyPromo,
  promoCode: 'FREETRIAL',
  plan: 'Test Plan',
  resetPromo,
};

const initialState = {
  value: '',
};

describe('Apply Promotional', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ApplyPromotional {...initialProps} />, initialState);
  });

  it('displays without errors', () => {
    expect(wrapper.find('div.promo-form')).toHaveLength(1);
  });

  it('initially displays a form', () => {
    expect(wrapper.find('span.apply-promo-form')).toHaveLength(1);
  });

  it('attempts to apply a supplied promo code', () => {
    const value = 'FREETRIAL';
    const { plan } = initialProps;
    wrapper.setState({ value });
    wrapper.instance().handlePromoSubmit();
    expect(applyPromo).toHaveBeenCalledWith(value, plan);
  });

  it('displays an applied promo code if its valid', () => {
    wrapper.setProps({ appliedPromoCode });
    wrapper.update();
    expect(wrapper.find('span.applied-promo')).toHaveLength(1);
  });

  it('resets an applied promo code when clicking an X button', () => {
    const value = 'FREETRIAL';
    wrapper.setState({ value });
    wrapper.instance().handleRemoveAppliedPromo();
    wrapper.update();
    expect(wrapper.state('value')).toBe('');
    expect(resetPromo).toHaveBeenCalled();
  });
});

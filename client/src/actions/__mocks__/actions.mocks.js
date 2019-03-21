export const avatarurl = 'http://test.com/test.png';
export const isgod = false;
export const collapsesidenav = false;

export const activeplans = [
  {
    amount: '0.00',
    billevery: 'Weekly',
    description: 'Test Subscription',
    id: '1234-1234-1234-1234',
    key: 12,
    planname: 'Test Plan',
    setupfee: null,
    startdate: '2018-12-18T22:06:40.976Z',
    status: 'active',
    subscribers: 8,
    trialperiod: null,
    userid: '88',
  },
];

export const activepromos = [
  {
    amount: 100,
    discounttype: '%',
    enddate: '2019-04-30T21:06:40.975Z',
    id: '1234-1234-1234-1234',
    key: 12,
    maxusage: 2147483647,
    plans: ['Test Plan'],
    promocode: 'FREETRIAL',
    startdate: '2018-12-01T22:06:40.976Z',
    status: 'active',
    totalusage: 8,
    userid: '88',
  },
];

export const activesubscribers = [
  {
    amount: '29.99',
    billingaddress: 'Test 12345 Way',
    billingcity: 'Test City',
    billingstate: 'CA',
    billingunit: null,
    billingzip: '55555',
    contactaddress: 'Test 12345 Way',
    contactcity: 'Test City',
    contactphone: '(555) 555-5555',
    contactstate: 'CA',
    contactunit: null,
    contactzip: '55555',
    credits: '0.00',
    email: 'betatester12@subskribble.com',
    enddate: null,
    id: '1234-1234-1234-1234',
    key: 12,
    planname: 'Test Plan',
    promocode: null,
    samebillingaddress: true,
    startdate: '2018-12-18T22:06:40.976Z',
    status: 'active',
    subscriber: 'Test User 1',
    userid: '88',
  },
];

export const activetemplates = [
  {
    fromsender: 'test@test.com',
    id: '1234-1234-1234-1234',
    key: 4,
    message: '<span>Mollit consectetur ea ut duis quis qui labor<span>',
    plans: ['Test Plan'],
    status: 'active',
    subject: 'Test Plan Subject',
    templatename: 'Test Plan Template',
    uniquetemplatename: 'test-plan-template',
    userid: '88',
  },
];

export const chargetransactions = [
  {
    amount: '0.00',
    chargedate: '2018-12-18T15:06:40.976-07:00',
    email: 'test@test.com',
    id: '1234-1234-1234-1234',
    invoice: '11111111-1111-1111-1111-11111111111',
    key: 12,
    planname: 'Carlotta Prime',
    processor: 'Paypal',
    refunddate: null,
    status: 'paid',
    subscriber: 'Test User 1',
    userid: '88',
  },
];

export const inactiveplans = [
  {
    amount: '0.00',
    billevery: 'Monthly',
    description: 'Test Subscription 2',
    id: '1235-1235-1235-1235',
    key: 24,
    planname: 'Test Plan',
    setupfee: null,
    startdate: '2018-12-18T22:06:40.976Z',
    status: 'suspended',
    subscribers: 5,
    trialperiod: '1 Month',
    userid: '88',
  },
];

export const inactivepromos = [
  {
    mount: 100,
    discounttype: '$',
    enddate: '2019-01-17T22:06:40.975Z',
    id: '1235-1235-1235-1235',
    key: 24,
    maxusage: 10,
    plans: ['Test Plan'],
    promocode: 'ASSOCIATED',
    startdate: '2018-12-18T22:06:40.976Z',
    status: 'suspended',
    totalusage: 5,
    userid: '88',
  },
];

export const inactivesubscribers = [
  {
    amount: '29.99',
    billingaddress: 'Test 12345 Way',
    billingcity: 'Test City',
    billingstate: 'CA',
    billingunit: null,
    billingzip: '55555',
    contactaddress: 'Test 12345 Way',
    contactcity: 'Test City',
    contactphone: '(555) 555-5555',
    contactstate: 'CA',
    contactunit: null,
    contactzip: '55555',
    credits: '0.00',
    email: 'betatester12@subskribble.com',
    enddate: null,
    id: '1235-1235-1235-1235',
    key: 12,
    planname: 'Test Plan',
    promocode: null,
    samebillingaddress: true,
    startdate: '2018-12-18T22:06:40.976Z',
    status: 'inactive',
    subscriber: 'Test User 2',
    userid: '88',
  },
];

export const inactivetemplates = [
  {
    fromsender: 'test@test.com',
    id: '1234-1234-1234-1234',
    key: 4,
    message: '<span>Mollit consectetur ea ut duis quis qui labor<span>',
    plans: ['Test Plan'],
    status: 'active',
    subject: 'Test Plan Subject',
    templatename: 'Test Plan Template',
    uniquetemplatename: 'test-plan-template',
    userid: '88',
  },
];

export const refundtransactions = [
  {
    amount: '0.00',
    chargedate: '2018-12-18T15:06:40.976-07:00',
    email: 'test@test.com',
    id: '1234-1234-1234-1234',
    invoice: '11111111-1111-1111-1111-11111111111',
    key: 12,
    planname: 'Carlotta Prime',
    processor: 'Paypal',
    refunddate: null,
    status: 'refunded',
    subscriber: 'Test User 1',
    userid: '88',
  },
];

export const billingFields = {
  billingAddress: '5555 Test Way',
  billingCity: 'TEST CITY',
  billingState: 'CA',
  billingUnit: undefined,
  billingZip: '5555',
};

export const messages = {
  fromsender: 'test@test.com',
  id: '1234-1234-1234-1234',
  key: 1,
  plans: ['Test Plan'],
  sentdate: '2018-12-18T22:06:40.976Z',
  subject: 'Test Subject',
  template: 'Test Template',
  userid: '88',
};

export const newSub = {
  ...billingFields,
  contactAddress: '5555 Test Way',
  contactCity: 'TEST CITY',
  contactEmail: 'test@example.com',
  contactFirstName: 'Test',
  contactLastName: 'Test',
  contactPhone: '(555) 555-5555',
  contactState: 'CA',
  contactZip: '55555',
  creditCard: '5555-5555-5555-5555',
  creditCardCVV: '555',
  creditCardExpMonth: '55',
  creditCardExpYear: '2019',
  sameBillingAddress: true,
  selectedPlan: 'Test Plan',
};

export const newPlan = {
  planname: 'Test',
  description: 'A test plan.',
  amount: 5.0,
  billevery: 'Monthly',
  setupfee: 0.0,
  trialperiod: '(none)',
};

export const newPromo = {
  plans: ['Test Plan'],
  promocode: 'PSSAVE1000PERCENT',
  amount: 100,
  discounttype: '%',
  dateStamps: ['2018-12-18T22:06:40.976Z', '2019-04-30T21:06:40.975Z'],
  maxusage: 10,
};

export const newTemplate = {
  plans: ['Test Plan'],
  templatename: 'Test Template',
  subject: 'Test Subject',
  fromsender: 'test@example.com',
};

export const appliedPromoCode = newPromo;

export const data = {
  company: 'Test',
  email: 'test@test.com',
  firstname: 'Test',
  lastname: 'Test',
  collapsesidenav,
  isgod,
};

export const updatedData = {
  avatarurl,
  company: 'Test2',
  email: 'test2@test.com',
  firstname: 'Test2',
  lastname: 'Test2',
  password: '12345',
  collapsesidenav,
  isgod,
};

export const creds = {
  username: 'test@test.com',
  password: 'password',
};

export const signUp = {
  company: 'Test',
  firstName: 'Test',
  lastName: 'Test',
  ...creds,
};

export const updatedUserAccount = {
  user: { ...updatedData },
  fetchnotifications: true,
  message: 'Successfully updated account!',
};

export const readNotifications = {
  icon: 'settings',
  id: '1234-1234-1234-1234',
  key: 1,
  message: 'Succesfully saved your avatar.',
  messagedate: '2019-03-06T12:49:46.390-07:00',
  read: true,
  userid: '88',
};

export const unreadNotifications = {
  icon: 'settings',
  id: '1235-1235-1235-1235',
  key: 1,
  message: 'Succesfully subscribed test@test.com to test plan!',
  messagedate: '2019-03-06T12:49:46.390-07:00',
  read: false,
  userid: '88',
};

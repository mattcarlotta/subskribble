export const avatarurl = 'http://test.com/test.png';
export const isgod = false;
export const collapsesidenav = false;

export const billingFields = {
  billingAddress: '5555 Test Way',
  billingCity: 'TEST CITY',
  billingState: 'CA',
  billingUnit: undefined,
  billingZip: '5555',
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
  dateStamps: [
    `${new Date('April 21, 2019 23:15:30')}`,
    `${new Date('May 21, 2019 23:15:30')}`,
  ],
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

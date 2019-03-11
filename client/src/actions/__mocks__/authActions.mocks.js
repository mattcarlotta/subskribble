export const avatarurl = 'http://test.com/test.png';
export const isgod = false;
export const collapsesidenav = false;

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

import ACTIVEPLANTABLEHEADERS from '../../../../plans/layouts/ActiveHeaders/activeHeaders.js';

export const initialProps = {
  current: 1,
  deleteAction: jest.fn(),
  editLocation: 'plans',
  fetchAction: jest.fn(),
  refund: false,
  selectCurrentPage: jest.fn(),
  sortByNum: 10,
  TAB: 'Active Plans',
  TABLECONTENTS: [
    {
      amount: '1.99',
      billevery: 'Weekly',
      description: 'Carlotta Subscription',
      id: '123',
      key: 12,
      planname: 'Carlotta Youtube',
      setupfee: null,
      startdate: '2018-12-18T22:06:40.976Z',
      status: 'active',
      subscribers: 8,
      trialperiod: null,
      userid: '88',
    },
  ],
  TABLEHEADERS: ACTIVEPLANTABLEHEADERS,
  TABLERECORDS: 1,
  updateAction: jest.fn(),
};

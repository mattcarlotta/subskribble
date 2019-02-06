import MESSAGETABLEHEADERS from '../../../../messages/layouts/Headers/headers.js';
import PLANCARDS from '../../../../plans/layouts/PanelCards/panelCards.js';

export const basicProps = {
  panelType: 'basic',
  SELECTFIELD: true,
  TAB: 'Messages',
  items: [
    {
      fromsender: 'betatester@subskribble.com',
      id: '123',
      key: 5,
      plans: ['Example Plan 1', 'Example Plan 2'],
      sentdate: '2018-12-18T15:06:40.976-07:00',
      subject: 'Example Subject',
      template: 'Example Template',
      userid: '88',
    },
  ],
  itemcount: 1,
  TABLEHEADERS: MESSAGETABLEHEADERS,
};

export const tabProps = {
  CARDS: PLANCARDS,
  activeitemcount: 1,
  activeitems: [
    {
      amount: '0.00',
      billevery: 'Weekly',
      description: 'Carlotta Subscription',
      id: '123',
      key: 12,
      planname: 'Example plan',
      setupfee: null,
      startdate: '2018-12-18T22:06:40.976Z',
      status: 'active',
      subscribers: 8,
      trialperiod: null,
      userid: '88',
    },
  ],
  buttonIcon: 'note_add',
  buttonPushLocation: 'plans/create',
  cardTitle: 'Plans',
  inactiveitemcount: 1,
  inactiveitems: [
    {
      amount: '0.00',
      billevery: 'Monthly',
      description: 'Example Subscription',
      id: '124',
      key: 24,
      planname: 'Example Plan Assoc.',
      setupfee: null,
      startdate: '2018-12-18T22:06:40.976Z',
      status: 'suspended',
      subscribers: 5,
      trialperiod: '1 Month',
      userid: '88',
    },
  ],
  serverError: '',
  serverMessage: '',
};

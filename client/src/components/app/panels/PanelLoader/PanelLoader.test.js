import { setupMount } from '../../../../tests/utils';
import PanelLoader from './PanelLoader.js';
import MESSAGETABLEHEADERS from '../../../messages/layouts/Headers/headers.js';
import PLANCARDS from '../../../plans/layouts/PanelCards/panelCards.js';

const initialState = {
  isLoading: true,
};

const deleteAction = jest.fn();
const fetchAction = jest.fn();
const fetchItemCounts = jest.fn();
const fetchItems = jest.fn();

const initialProps = {
  buttonPushLocation: '/subskribble',
  deleteAction,
  fetchAction,
  fetchItemCounts,
  fetchItems,
};

const failProps = {
  serverError: '404 - Not Found',
};

const basicProps = {
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

const tabProps = {
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

describe('Panel Loader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setupMount(PanelLoader, initialProps, initialState);
  });

  it('renders a loader without errors', () => {
    const loaderComponent = wrapper.find('PanelLoading');
    expect(loaderComponent).toHaveLength(1);
  });

  it('renders a no data found panel on error', () => {
    wrapper.setProps({ ...failProps });
    wrapper.update();

    const noDataToDisplayComponent = wrapper.find('NoDataToDisplay');
    expect(noDataToDisplayComponent).toHaveLength(1);
  });

  describe('when data is present and panelType is basic, renders a BasicPanel', () => {
    beforeEach(() => {
      wrapper.setProps({ ...basicProps });
      wrapper.setState({ isLoading: false });
      wrapper.update();
    });

    it('renders a panel body without errors', () => {
      const panelBodyComponent = wrapper.find('div.panelBody');
      expect(panelBodyComponent).toHaveLength(1);
    });

    it('hides the panel when the minimize button is clicked', () => {
      const panelButton = wrapper.find('button.panelButton');
      panelButton.simulate('click');

      const panelBodyComponent = wrapper.find('div.panelBody');
      expect(panelBodyComponent).toHaveLength(0);
    });

    it('renders an items per page selection', () => {
      const selectFieldComponent = wrapper.find('div.selectField');
      expect(selectFieldComponent).toHaveLength(1);
    });

    it('renders a CustomButton', () => {
      const customButtonComponent = wrapper.find('CustomButton');
      expect(customButtonComponent).toHaveLength(1);
    });

    it('renders a TableList', () => {
      const tableListComponent = wrapper.find('TableList');
      expect(tableListComponent).toHaveLength(1);
    });
  });

  describe('when data is present and panelType is tab, renders a TabPanel', () => {
    beforeEach(() => {
      wrapper.setProps({ ...tabProps });
      wrapper.setState({ isLoading: false });
      wrapper.update();
    });

    it('renders a panel body without errors', () => {
      const panelBodyComponent = wrapper.find('div.panelBody');
      expect(panelBodyComponent).toHaveLength(1);
    });

    it('hides the panel when the minimize button is clicked', () => {
      const panelButton = wrapper.find('button.panelButton');
      panelButton.simulate('click');

      const panelBodyComponent = wrapper.find('div.panelBody');
      expect(panelBodyComponent).toHaveLength(0);
    });

    it('contains 2 separate tabs', () => {
      const tabPanes = wrapper.find('TabPane');
      expect(tabPanes).toHaveLength(2);
    });

    it('renders an items per page selection', () => {
      const selectFieldComponent = wrapper.find('div.selectField');
      expect(selectFieldComponent).toHaveLength(1);
    });

    it('renders a CustomButton', () => {
      const customButtonComponent = wrapper.find('CustomButton');
      expect(customButtonComponent).toHaveLength(1);
    });

    it('renders a TableList', () => {
      const tableListComponent = wrapper.find('TableList');
      expect(tableListComponent).toHaveLength(1);
    });
  });
});

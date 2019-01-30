import { setupMount } from '../../../../tests/utils';
import BasicPanelLoader from './BasicPanelLoader.js';

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

const dataProps = {
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
  TABLEHEADERS: [
    {
      title: 'Transaction #',
      dataIndex: 'id',
    },
    {
      title: 'Template',
      dataIndex: 'template',
    },
    {
      title: 'From Sender',
      dataIndex: 'fromsender',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
    },
    {
      title: 'Sent Date',
      dataIndex: 'sentdate',
    },
  ],
};

describe('Basic Panel Loader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setupMount(BasicPanelLoader, initialProps, initialState);
  });

  it('renders a loader without errors', () => {
    const loaderComponent = wrapper.find('PanelLoader');
    expect(loaderComponent).toHaveLength(1);
  });

  it('renders a no data found panel on error', () => {
    wrapper.setProps({ ...failProps });
    wrapper.update();

    const noDataToDisplayComponent = wrapper.find('NoDataToDisplay');
    expect(noDataToDisplayComponent).toHaveLength(1);
  });

  describe('when data is present, renders a BasicPanel', () => {
    beforeEach(() => {
      wrapper.setProps({ ...dataProps });
      wrapper.setState({ isLoading: false });
      wrapper.update();
    });

    it('renders a panel body without errors', () => {
      const panelBodyComponent = wrapper.find('div.panelBody');
      expect(panelBodyComponent).toHaveLength(1);
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

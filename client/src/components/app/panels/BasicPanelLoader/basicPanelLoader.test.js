import { setup } from '../../../../tests/utils';
import BasicPanelLoader from './BasicPanelLoader.js';
import BasicPanel from '../BasicPanel/basicPanel.js';

const initialState = {
  isLoading: true,
};

const deleteAction = jest.fn();
const fetchAction = jest.fn();
const fetchItemCounts = jest.fn();
const fetchItems = jest.fn();

const nextProps = {
  deleteAction,
  fetchAction,
  fetchItemCounts,
  fetchItems,
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
    wrapper = setup(BasicPanelLoader, null, initialState);
  });

  it('renders a loader without errors', () => {
    const loaderComponent = wrapper.find('Connect(Loader)');
    expect(loaderComponent).toHaveLength(1);
  });

  it('when data is present, renders a BasicPanel without errors', () => {
    wrapper.setProps({ ...nextProps });
    wrapper.setState({ isLoading: false });
    wrapper.update();
    const basicPanelComponent = wrapper.find(BasicPanel);
    expect(basicPanelComponent).toHaveLength(1);
  });
});

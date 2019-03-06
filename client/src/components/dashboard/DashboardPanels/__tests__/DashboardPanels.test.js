import Dashboard from '../DashboardPanels.js';
import { mockGetDashboardData } from '../__mocks__/DashboardPanels.mocks.js';

const initialProps = {
  getDashboardData: () => mockGetDashboardData('success'),
};

const initialState = {
  isLoading: true,
  subscribers: '',
  inactivesubscribers: '',
  plans: '',
  popularplans: [],
  popularpromotionals: [],
  promotionals: '',
  credits: '',
  creditstotal: '',
  dues: '',
  duestotal: '',
  charges: '',
  chargestotal: '',
  refunds: '',
  refundstotal: '',
  messages: '',
  activetemplates: '',
  inactivetemplates: '',
};

describe('Dashboard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Dashboard {...initialProps} />, initialState);
  });

  it('it initially renders nothing', () => {
    expect(wrapper.find('div.pageContainer')).toHaveLength(0);
  });

  it('renders 6 panels without errors', async () => {
    wrapper.instance().fetchData();
    await Promise.resolve();
    wrapper.update();
    expect(wrapper.find('div.pageContainer')).toHaveLength(1);
    expect(wrapper.find('MiniPanel')).toHaveLength(6);
  });

  it('renders 6 NoData placeholders if data is missing', async () => {
    wrapper.setProps({ getDashboardData: () => mockGetDashboardData('fail') });
    await Promise.resolve();
    wrapper.update();
    expect(wrapper.find('div.noData')).toHaveLength(6);
  });
});

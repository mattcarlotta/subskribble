import PanelLoader from '../PanelLoader.js';
import { basicProps, tabProps } from '../__mocks__/PanelLoader.mocks.js';

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

describe('Panel Loader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PanelLoader {...initialProps} />, initialState);
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

import { checkProps, setup } from '../../../../tests/utils';
import SelectField from './selectField.js';

const fetchAction = jest.fn();
const setSortByNum = jest.fn();
const selectCurrentPage = jest.fn();
const initialProps = {
  fetchAction,
  setSortByNum,
  selectCurrentPage,
  OPTIONS: [10, 20, 50, 100],
  TAB: 'Subscribers',
  sortByNum: 10,
};

const wrapper = setup(SelectField, initialProps, null);

describe('Select Field', () => {
  it('renders without errors', () => {
    const selectFieldComponent = wrapper.find('div.selectField');
    expect(selectFieldComponent).toHaveLength(1);
  });

  it('does not not throw PropType warnings', () =>
    checkProps(SelectField, initialProps));

  it('when an option is selected, sets setSortByNum, resets the current page and fetches new data', () => {
    const nextRecords = 20;
    const spy = jest.spyOn(wrapper.instance(), 'handleSortDataBy');
    wrapper.instance().forceUpdate();
    const selectMenu = wrapper.find('Select');
    selectMenu.simulate('select', nextRecords);
    expect(spy).toHaveBeenCalled();
    expect(setSortByNum).toBeCalledWith(nextRecords);
    expect(selectCurrentPage).toBeCalledWith(1);
    expect(fetchAction).toBeCalledWith('Subscribers', 0, nextRecords);
    spy.mockClear();
  });
});

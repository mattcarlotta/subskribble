import TableList from '../tableList.js';
import { initialProps } from '../__mocks__/tableList.mocks.js';

const wrapper = mount(<TableList {...initialProps} />);
describe('Table List', () => {
  it('renders without errors', () => {
    const tableListComponent = wrapper.find('div.tableList');
    expect(tableListComponent).toHaveLength(1);
  });

  it('renders table headers', () => {
    const tableHeaders = wrapper.find('th');
    expect(tableHeaders).toHaveLength(10);
  });

  it('renders table data', () => {
    const tableData = wrapper.find('td');
    expect(tableData).toHaveLength(10);
  });
});

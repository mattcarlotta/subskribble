import TableActions from '../TableActions.js';
import { initialProps } from '../__mocks__/TableActions.mocks.js';

const { deleteAction, updateAction } = initialProps;

describe('Table Actions', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<TableActions {...initialProps} />);
  });

  it('renders without errors', () => {
    const tableActionsComponent = wrapper.find('.tableActions');
    expect(tableActionsComponent).toHaveLength(1);
  });

  it('updates an item on click', () => {
    wrapper.find('button.update').simulate('click');
    wrapper
      .find('.ant-popover-buttons')
      .find('button')
      .at(1)
      .simulate('click');
    expect(updateAction).toHaveBeenCalled();
  });

  it('edits an item on click', () => {
    const spy = jest.spyOn(wrapper.instance(), 'editItem');
    wrapper.instance().forceUpdate();

    wrapper.find('button.edit').simulate('click');
    wrapper
      .find('.ant-popover-buttons')
      .find('button')
      .at(1)
      .simulate('click');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('deletes an item on click', () => {
    wrapper.find('button.delete').simulate('click');
    wrapper
      .find('.ant-popover-buttons')
      .find('button')
      .at(1)
      .simulate('click');
    expect(deleteAction).toHaveBeenCalled();
  });
});

import InlineMenu from '../InlineMenu.js';

const handleTabClick = jest.fn();
const initialProps = {
  handleTabClick,
  collapseSideNav: false,
  selectedKey: [''],
};

describe('Inline Menu and Menu Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<InlineMenu {...initialProps} />);
  });

  it('renders without errors', () => {
    const inlineMenuComponent = wrapper.find('div.siderMenu');
    expect(inlineMenuComponent).toHaveLength(1);
  });

  it('updates the page URL when a menu tab has been selected', () => {
    const menuItem = wrapper.find('MenuItem').first();
    menuItem.simulate('click');
    expect(handleTabClick.mock.calls).toHaveLength(1);
  });

  it('collapses the menu when collapseSideNav is true', () => {
    wrapper.setProps({ collapseSideNav: true });
    wrapper.update();

    const menuCollapsed = wrapper.find('.ant-layout-sider-collapsed');
    expect(menuCollapsed).toHaveLength(1);
  });

  it('highlights the selected tab via selectedKey', () => {
    wrapper.setProps({ selectedKey: ['subscribers'] });
    wrapper.update();

    const selectedTab = wrapper
      .find('li.ant-menu-item-selected')
      .find('span.menuLabel')
      .text();
    expect(selectedTab).toBe('Subscribers');
  });
});

import { checkProps, setupMount } from '../../../../tests/utils';
import NotificationButton from './NotificationButton.js';

const removeAllNotifications = jest.fn();
const deleteNotification = jest.fn();
const updateNotifications = jest.fn();
const unreadNotifications = [
  {
    icon: 'new_releases',
    id: '123',
    key: 10,
    message: 'Example message',
    messagedate: '2018-12-18T15:06:40.976-07:00',
    read: false,
    userid: '88',
  },
];
const readNotifications = [
  {
    icon: 'new_releases',
    id: '122',
    key: 9,
    message: 'Example message',
    messagedate: '2018-12-18T15:06:40.976-07:00',
    read: true,
    userid: '88',
  },
];

const initialProps = {
  removeAllNotifications,
  deleteNotification,
  updateNotifications,
  unreadNotifications: [],
  readNotifications: [],
};

const initialState = {
  visibleNotifications: false,
};

describe('Notification Button and Popover (when visible)', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setupMount(NotificationButton, initialProps, initialState);
    wrapper.setState({ visibleNotifications: true });
    wrapper.update();
  });

  it('renders without errors', () => {
    const notificationsComponent = wrapper.find('div.notificationsContainer');
    expect(notificationsComponent).toHaveLength(1);
  });

  it('does not throw PropType warnings', () => {
    checkProps(NotificationButton, initialProps);
  });

  it('displays an empty preview if notifications are absent', () => {
    const emptyNotificationPreview = wrapper.find('div.notificationEmpty');
    expect(emptyNotificationPreview).toHaveLength(1);
  });

  describe('contains unread or read notifications', () => {
    it('clicking on the notification button in the navbar calls handleVisibleChange method, which closes the popover and calls updateNotifications', () => {
      const visible = false;
      const spy = jest.spyOn(wrapper.instance(), 'handleVisibleChange');
      wrapper.instance().forceUpdate();
      const notificationButton = wrapper.find('Popover');
      notificationButton.simulate('click', visible);
      expect(spy).toHaveBeenCalledWith(visible);
      expect(wrapper.state('visibleNotifications')).toBeFalsy();
      spy.mockClear();
    });

    it('clicking on the top bar trash can button calls handleClearNotes method, which calls removeAllNotifications', () => {
      const spy = jest.spyOn(wrapper.instance(), 'handleClearNotes');
      wrapper.instance().forceUpdate();
      const clearNotificationsButton = wrapper.find(
        'button.clearNotifications',
      );
      clearNotificationsButton.simulate('click');
      expect(spy).toHaveBeenCalled();
      expect(removeAllNotifications).toBeCalled();
      spy.mockClear();
    });

    it('clicking on a trash can button inside of a notification calls handleDeleteNote method, which calls deleteNotification', () => {
      wrapper.setProps({ unreadNotifications, readNotifications });
      wrapper.update();

      const spy = jest.spyOn(wrapper.instance(), 'handleDeleteNote');
      wrapper.instance().forceUpdate();
      const deleteNotificationButton = wrapper
        .find('button.removeNoteButton')
        .first();
      deleteNotificationButton.simulate('click');
      expect(spy).toHaveBeenCalled();
      expect(deleteNotification).toBeCalledWith(unreadNotifications[0].id);
      spy.mockClear();
    });
  });
});

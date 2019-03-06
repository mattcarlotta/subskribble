import NotificationButton from '../NotificationButton.js';
import {
  readNotifications,
  unreadNotifications,
} from '../__mocks__/notificationButton.mocks.js';

const removeAllNotifications = jest.fn();
const deleteNotification = jest.fn();
const updateNotifications = jest.fn();

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
    wrapper = mount(<NotificationButton {...initialProps} />, initialState);
    wrapper.setState({ visibleNotifications: true });
    wrapper.update();
  });

  it('renders without errors', () => {
    const notificationsComponent = wrapper.find('div.notificationsContainer');
    expect(notificationsComponent).toHaveLength(1);
  });

  it('displays an empty preview if notifications are absent', () => {
    const emptyNotificationPreview = wrapper.find('div.notificationEmpty');
    expect(emptyNotificationPreview).toHaveLength(1);
  });

  describe('contains unread or read notifications', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });

    it('clicking on the notification button in the navbar closes the popover and updates all notifications as read', () => {
      const visible = false;
      spy = jest.spyOn(wrapper.instance(), 'handleVisibleChange');
      wrapper.instance().forceUpdate();
      const notificationButton = wrapper.find('Popover');
      notificationButton.simulate('click', visible);
      expect(spy).toHaveBeenCalledWith(visible);
      expect(wrapper.state('visibleNotifications')).toBeFalsy();
      expect(updateNotifications).toHaveBeenCalled();
    });

    it('clicking on the top bar trash can button clears all notifications', () => {
      spy = jest.spyOn(wrapper.instance(), 'handleClearNotes');
      wrapper.instance().forceUpdate();
      const clearNotificationsButton = wrapper.find(
        'button.clearNotifications',
      );
      clearNotificationsButton.simulate('click');
      expect(spy).toHaveBeenCalled();
      expect(removeAllNotifications).toHaveBeenCalled();
    });

    it('clicking on a trash can button inside of a notification deletes the notification', () => {
      wrapper.setProps({ unreadNotifications, readNotifications });
      wrapper.update();

      spy = jest.spyOn(wrapper.instance(), 'handleDeleteNote');
      wrapper.instance().forceUpdate();
      const deleteNotificationButton = wrapper
        .find('button.removeNoteButton')
        .first();
      deleteNotificationButton.simulate('click');
      expect(spy).toHaveBeenCalled();
      expect(deleteNotification).toHaveBeenCalledWith(
        unreadNotifications[0].id,
      );
    });
  });
});

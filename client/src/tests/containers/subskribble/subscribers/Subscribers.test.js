import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Subscribers from '../../../../containers/subskribble/subscribers/Subscribers';
import { ACTIVESUBSCRIBERS, INACTIVESUBSCRIBERS } from '../../../fixtures/subscribers';

let wrapper;

describe('[SUBSCRIBERS]', () => {
  beforeEach(() => {
    wrapper = shallow(<Subscribers />);
  })

  it('should load Subscribers component', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  })

  it('should update Subscriber\'s local state and render the TableList', async () => {
    await wrapper.instance().fetchAllSubscribers();
    expect(wrapper.props().activesubscribers).toEqual(ACTIVESUBSCRIBERS);
    expect(wrapper.props().inactivesubscribers).toEqual(INACTIVESUBSCRIBERS);
    wrapper.update();
    expect(toJSON(wrapper)).toMatchSnapshot();
  })

})

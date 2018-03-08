import React from 'react';
import { shallow, mount } from 'enzyme';
import Subscribers from '../../../../containers/subskribble/subscribers/Subscribers';
import { ACTIVESUBSCRIBERS } from '../../../fixtures/activeSubscribers';
import { fetchSubscribers } from '../../../../actions/subscriberActions';

let wrapper;

describe('[SUBSCRIBERS]', () => {
  beforeEach(() => {
    wrapper = shallow(<Subscribers />);
  })

  it('should render Subscribers component', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render Subscriber list', async () => {
    await wrapper.instance().fetchAllSubscribers();
    expect(wrapper.state().subscribers).toEqual(ACTIVESUBSCRIBERS);
  })

  it('should fetchAllSubscribers', () => {
    return fetchSubscribers().then(({data: {subscribers}}) => expect(subscribers).not.toEqual(undefined))
  })

})

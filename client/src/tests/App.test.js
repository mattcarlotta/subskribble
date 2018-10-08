import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import App from '../routes';

describe('[APP]', () => {
  it('should render without crashing', () => {
    shallow(<App />);
  });

  it('should match a snapshot', () => {
    const wrapper = shallow(<App />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  })
})

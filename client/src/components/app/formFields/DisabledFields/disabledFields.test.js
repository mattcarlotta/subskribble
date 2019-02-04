import React from 'react';
import { shallowComponent, checkProps } from '../../../../tests/utils';
import DisabledFields from './disabledFields.js';

const initialProps = {
  fromsender: '',
  plans: [],
  subject: '',
};

const nextProps = {
  fromsender: 'betatester@subskribble.com',
  plans: ['Test Plan 1', 'Test Plan 2', 'Test Plan 3'],
  subject: 'Test Subject',
};

const wrapper = shallowComponent(<DisabledFields {...initialProps} />); // set wrapper with initialProps

describe('Disabled Template Fields', () => {
  it('renders without errors', () => {
    const disabledFieldsComponent = wrapper.find('div.disabledOptions');
    expect(disabledFieldsComponent).toHaveLength(1);
  });

  it('does not not throw PropType warnings', () =>
    checkProps(DisabledFields, initialProps));

  it('contains disabled fields with default text', () => {
    const disabledPlans = wrapper.find('div.plans').text();
    const disabledFromSender = wrapper.find('div.fromsender').text();
    const disabledSubject = wrapper.find('div.subject').text();
    expect(disabledPlans).toBe('Template plans.');
    expect(disabledFromSender).toBe('Template sender email address.');
    expect(disabledSubject).toBe('Template subject.');
  });

  it('updates disabled fields with template details once a plan has been selected', () => {
    wrapper.setProps({ ...nextProps });
    wrapper.update();
    const disabledPlans = wrapper
      .find('div.plans')
      .children()
      .find('div.disabledTags');
    const disabledFromSender = wrapper.find('div.fromsender').text();
    const disabledSubject = wrapper.find('div.subject').text();
    expect(disabledPlans).toHaveLength(nextProps.plans.length);
    expect(disabledFromSender).toContain(nextProps.fromsender);
    expect(disabledSubject).toContain(nextProps.subject);
  });
});

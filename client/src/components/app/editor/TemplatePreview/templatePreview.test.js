import React from 'react';
import { mount } from 'enzyme';
import { checkProps, findByTestAttr } from '../../../../tests/utils';
import TemplatePreview from './templatePreview.js';

const initialProps = {
  company: '',
  fromsender: '',
  message: '',
  subject: '',
};

const nextProps = {
  company: 'Subskribble',
  fromsender: 'betatester@subskribble.com',
  message: 'This a message!',
  subject: 'Test Subject',
};

describe('Template Preview', () => {
  let wrapper;
  let templatePreviewComponent;
  beforeEach(() => {
    wrapper = mount(<TemplatePreview {...initialProps} />); // set wrapper with initialState
    templatePreviewComponent = findByTestAttr(
      wrapper,
      'component-templatePreview',
    ); // get template preview component
  });

  it('renders without errors', () =>
    expect(templatePreviewComponent).toHaveLength(1));

  it('does not not throw PropType warnings', () =>
    checkProps(TemplatePreview, initialProps));

  it('renders an empty preview message if initial props are empty', () => {
    const emptyPreviewComponent = findByTestAttr(
      wrapper,
      'component-emptyPreview',
    ); // get empty template preview component
    expect(emptyPreviewComponent).toHaveLength(1);
  });

  describe('renders a preview template if props are filled in', () => {
    beforeEach(() => {
      wrapper.setProps({ ...nextProps }); // set mounted component props with nextProps
      wrapper.update(); // update mounted component
    });

    it('renders without errors', () => {
      const showPreviewComponent = findByTestAttr(
        wrapper,
        'component-showPreview',
      ); // get template preview component
      expect(showPreviewComponent).toHaveLength(1);
    });

    it('renders the filled in subject', () => {
      const showPreviewSubject = findByTestAttr(
        wrapper,
        'showPreview-subject',
      ).text(); // get template preview subject
      expect(showPreviewSubject).toContain(nextProps.subject);
    });

    it('renders the filled in company', () => {
      const showPreviewCompany = findByTestAttr(
        wrapper,
        'showPreview-company',
      ).text(); // get template preview company
      expect(showPreviewCompany).toContain(nextProps.company);
    });

    it('renders the filled in message', () => {
      const showPreviewMessage = findByTestAttr(
        wrapper,
        'showPreview-message',
      ).text(); // get template preview fromsender
      expect(showPreviewMessage).toContain(nextProps.message);
    });
  });
});

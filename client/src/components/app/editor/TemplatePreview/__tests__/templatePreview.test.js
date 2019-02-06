import TemplatePreview from '../templatePreview.js';

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
    wrapper = mount(<TemplatePreview {...initialProps} />); // mount component wrapper with initialProps
    templatePreviewComponent = wrapper.find('div.previewBoxContainer');
  });

  it('renders without errors', () =>
    expect(templatePreviewComponent).toHaveLength(1));

  it('does not not throw PropType warnings', () =>
    checkProps(TemplatePreview, initialProps));

  it('renders an empty preview message if initial props are empty', () => {
    const emptyPreviewComponent = wrapper.find('div.boxEmpty');
    expect(emptyPreviewComponent).toHaveLength(1);
  });

  describe('renders a preview template if props are filled in', () => {
    beforeEach(() => {
      wrapper.setProps({ ...nextProps }); // set mounted component props with nextProps
    });

    it('renders without errors', () => {
      const showPreviewComponent = wrapper.find('div.boxContainer');
      expect(showPreviewComponent).toHaveLength(1);
    });

    it('renders the filled in subject', () => {
      const showPreviewSubject = wrapper.find('h4.subject').text();
      expect(showPreviewSubject).toContain(nextProps.subject);
    });

    it('renders the filled in company', () => {
      const showPreviewCompany = wrapper.find('span.fromCompany').text();
      expect(showPreviewCompany).toContain(nextProps.company);
    });

    it('renders the filled in fromSender', () => {
      const showPreviewFromSender = wrapper.find('span.fromSender').text();
      expect(showPreviewFromSender).toContain(nextProps.fromsender);
    });

    it('renders the filled in message', () => {
      const showPreviewMessage = wrapper.find('div.preview').text();
      expect(showPreviewMessage).toContain(nextProps.message);
    });
  });
});

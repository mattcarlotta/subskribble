import React from 'react';
import PropTypes from 'prop-types';
import EmptyPreview from '../EmptyPreview/emptyPreview.js';
import ShowPreview from '../ShowPreview/showPreview.js';
import { previewBoxContainer } from '../../../../styles/styles.scss';

const TemplatePreview = ({ company, fromsender, message, subject }) => (
  <div className={previewBoxContainer}>
    <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Template Preview</h1>
    {!fromsender && !subject && (message === '<p><br></p>' || !message) ? (
      <EmptyPreview />
    ) : (
      <ShowPreview
        company={company}
        fromSender={fromsender}
        message={message}
        subject={subject}
      />
    )}
  </div>
);

export default TemplatePreview;

TemplatePreview.propTypes = {
  company: PropTypes.string,
  fromsender: PropTypes.string,
  message: PropTypes.string,
  subject: PropTypes.string,
};

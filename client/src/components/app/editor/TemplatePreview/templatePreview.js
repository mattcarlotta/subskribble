import React from 'react';
import EmptyPreview from '../EmptyPreview/emptyPreview';
import ShowPreview from '../ShowPreview/showPreview';
import { previewBoxContainer } from '../../../../styles';

export default props => (
  <div className={previewBoxContainer}>
    <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Template Preview</h1>
    {!props.fromSender &&
    !props.subject &&
    (props.message === '<p><br></p>' || !props.message) ? (
      <EmptyPreview {...props} />
    ) : (
      <ShowPreview {...props} />
    )}
  </div>
);

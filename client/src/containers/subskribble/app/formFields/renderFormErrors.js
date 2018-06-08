import React from 'react';

export default ({ error, touched }) => (
  touched && error
    ? <p> {error} </p>
    : null
)

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

export default function({
  backgroundColor,
  border,
  className,
  fontSize,
  height,
  label,
  link,
  onClick,
  width
}) {
  return (
    <Link to={link} className={className}>
      <RaisedButton
        backgroundColor={backgroundColor}
        buttonStyle={{ border, borderRadius: 5 }}
        label={label}
        labelStyle={{ fontSize: fontSize, fontFamily: "'Poppins Semi-Bold', sans-serif" }}
        labelColor="#eee"
        onClick={onClick}
        style={{ height, width, marginTop: 15, borderRadius: 6 }}
      />
    </Link>
  )
}
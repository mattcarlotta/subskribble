import React from 'react';
import { Button } from 'antd';
// import { Link } from 'react-router';

export default function({ btnClassName, border, className, fontSize, height, label, onClickAction, width }) {
  return (
    <div className={className}>
      <Button
        className={`btn ${btnClassName}`}
        onClick={onClickAction}
        style={{ border, fontSize, height, width }}
      >
        {label}
      </Button>
    </div>
  )
}

// export default function({
//   backgroundColor,
//   border,
//   className,
//   fontSize,
//   height,
//   label,
//   link,
//   onClick,
//   width
// }) {
//   return (
//     <Link to={link} className={className}>
//       <RaisedButton
//         backgroundColor={backgroundColor}
//         buttonStyle={{ border, borderRadius: 5 }}
//         label={label}
//         labelStyle={{ fontSize: fontSize, fontFamily: "'Poppins Semi-Bold', sans-serif" }}
//         labelColor="#eee"
//         onClick={onClick}
//         style={{ height, width, marginTop: 15, borderRadius: 6 }}
//       />
//     </Link>
//   )
// }

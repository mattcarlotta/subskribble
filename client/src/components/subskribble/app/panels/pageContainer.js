import React from 'react';

export default WrappedComponent => (
  () => (
    <div className="page-container">
      <WrappedComponent />
    </div>
  )
)
